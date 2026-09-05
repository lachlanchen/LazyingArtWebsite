import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.checked = false;
    this.disabled = false;
    this.focusCount = 0;
    this.handlers = new Map();
    this.hidden = false;
    this.href = "";
    this.style = {};
    this.textContent = "";
  }

  addEventListener(type, handler) {
    const handlers = this.handlers.get(type) || [];
    handlers.push(handler);
    this.handlers.set(type, handlers);
  }

  async dispatch(type) {
    const event = {
      defaultPrevented: false,
      preventDefault() {
        this.defaultPrevented = true;
      },
    };
    for (const handler of this.handlers.get(type) || []) {
      await handler(event);
    }
    return event;
  }

  focus() {
    this.focusCount += 1;
  }

  remove() {}
  removeAttribute(name) { this.attributes.delete(name); }
  scrollIntoView() {}
  select() {}
  setAttribute(name, value) { this.attributes.set(name, value); }
}

const cases = [
  {
    name: "manuscript",
    path: "../manuscript-sprint/fit-check/fit-check.js",
    pageUrl: "https://lazying.art/manuscript-sprint/fit-check/",
    values: {
      contact_email: "author@example.com",
      role: "Corresponding author with source rights.",
      shape: "6,800 words, one main TeX file, baseline and revision",
      venue: "Named journal template; deadline in three weeks.",
      problem: "The generated redline fails while both source versions build.",
      outputs: "Clean PDF, source archive, redline, log, and issue ledger.",
      handling: "Keep source private and delete working copies after delivery.",
      constraints: "Do not change scientific claims.",
      rights: true,
      scope: true,
      website: "",
    },
    expectedKeys: [
      "client_elapsed_ms", "constraints", "contact_email", "handling", "offer",
      "outputs", "problem", "rights_confirmed", "role", "scope_confirmed",
      "shape", "utm_campaign", "utm_source", "venue", "website",
    ],
  },
  {
    name: "lecture",
    path: "../lecture-pack/fit-check/fit-check.js",
    pageUrl: "https://lazying.art/lecture-pack/fit-check/",
    values: {
      contact_email: "teacher@example.com",
      source: "I own the recording, slides, and voice rights.",
      format: "14-minute MP4, one speaker, clear audio",
      language: "Traditional Chinese for intermediate learners",
      terms: "Preserve the supplied names and two formulas.",
      excerpt: "00:02:10–00:02:45",
      intended_use: "A public course page controlled by the teacher.",
      constraints: "Provide WebVTT and SRT.",
      rights: true,
      scope: true,
      website: "",
    },
    expectedKeys: [
      "client_elapsed_ms", "constraints", "contact_email", "excerpt", "format",
      "intended_use", "language", "offer", "rights_confirmed", "scope_confirmed",
      "source", "terms", "utm_campaign", "utm_source", "website",
    ],
  },
];

function setup(testCase, fetchImpl) {
  const script = fs.readFileSync(fileURLToPath(new URL(testCase.path, import.meta.url)), "utf8");
  const elements = {
    form: new FakeElement(),
    formStatus: new FakeElement(),
    panel: new FakeElement(),
    heading: new FakeElement(),
    preview: new FakeElement(),
    reviewConfirmed: new FakeElement(),
    sendButton: new FakeElement(),
    openEmail: new FakeElement(),
    copyButton: new FakeElement(),
    submissionStatus: new FakeElement(),
  };
  elements.panel.hidden = true;
  elements.sendButton.disabled = true;
  elements.form.values = { ...testCase.values };
  elements.form.checkValidity = () => true;
  elements.form.reportValidity = () => {};
  elements.form.controls = Array.from({ length: 12 }, () => new FakeElement());
  elements.form.querySelectorAll = () => elements.form.controls;

  const selectors = new Map([
    ["[data-testid='fit-form']", elements.form],
    ["#fit-form-status", elements.formStatus],
    ["[data-testid='review-panel']", elements.panel],
    ["[data-testid='review-heading']", elements.heading],
    ["[data-testid='request-preview']", elements.preview],
    ["[data-testid='review-confirmed']", elements.reviewConfirmed],
    ["[data-testid='send-fit-check']", elements.sendButton],
    ["[data-testid='open-email']", elements.openEmail],
    ["[data-testid='copy-request']", elements.copyButton],
    ["#submission-status", elements.submissionStatus],
  ]);
  const page = new URL(`${testCase.pageUrl}?utm_source=owned_page&utm_campaign=service_fit&bad=x`);
  const body = new FakeElement();
  body.dataset = { fitState: "editing" };
  body.appendChild = () => {};
  const calls = [];
  let now = 10000;

  class MockFormData {
    constructor(form) { this.values = form.values; }
    get(name) {
      if (!(name in this.values)) return null;
      return typeof this.values[name] === "boolean"
        ? (this.values[name] ? "on" : null)
        : this.values[name];
    }
  }

  const context = {
    Date: { now: () => now },
    FormData: MockFormData,
    TextEncoder,
    URL,
    URLSearchParams,
    document: {
      body,
      referrer: "",
      createElement: () => new FakeElement(),
      execCommand: () => true,
      querySelector: (selector) => selectors.get(selector) || null,
    },
    fetch: (...args) => {
      calls.push(args);
      return fetchImpl(...args);
    },
    navigator: { clipboard: { writeText: async () => {} } },
    window: { location: { origin: page.origin, search: page.search } },
  };
  vm.runInNewContext(script, context);
  return {
    advance(ms) { now += ms; },
    body,
    calls,
    elements,
  };
}

const acceptedResponse = async () => ({
  status: 202,
  async json() {
    return {
      status: "accepted",
      message: "Request received for review.",
      receipt: "0123456789abcdef0123456789abcdef",
    };
  },
});

for (const testCase of cases) {
  const fixture = setup(testCase, acceptedResponse);
  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls.length, 0, `${testCase.name}: send is inert before review`);

  fixture.advance(5000);
  const review = await fixture.elements.form.dispatch("submit");
  assert.equal(review.defaultPrevented, true);
  assert.equal(fixture.calls.length, 0, `${testCase.name}: review does not send`);
  assert.equal(fixture.elements.panel.hidden, false);
  assert.equal(fixture.elements.sendButton.disabled, true);
  assert.match(fixture.elements.preview.textContent, /Contact email:/);
  assert.match(fixture.elements.openEmail.href, /^mailto:contact@lazying\.art\?/);

  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls.length, 0, `${testCase.name}: confirmation gate holds`);
  fixture.elements.reviewConfirmed.checked = true;
  await fixture.elements.reviewConfirmed.dispatch("change");
  assert.equal(fixture.elements.sendButton.disabled, false);
  await fixture.elements.sendButton.dispatch("click");

  assert.equal(fixture.calls.length, 1);
  const [url, options] = fixture.calls[0];
  assert.equal(url, "https://blog.lazying.art/wp-json/lazyingart/v1/lkt-fit-check");
  assert.equal(options.method, "POST");
  assert.equal(options.credentials, "omit");
  const payload = JSON.parse(options.body);
  assert.deepEqual(Object.keys(payload).sort(), testCase.expectedKeys);
  assert.equal(payload.offer, testCase.name);
  assert.equal(payload.contact_email, testCase.values.contact_email);
  assert.equal(payload.rights_confirmed, true);
  assert.equal(payload.scope_confirmed, true);
  assert.equal(payload.client_elapsed_ms, 5000);
  assert.equal(payload.utm_source, "owned_page");
  assert.equal(payload.utm_campaign, "service_fit");
  assert.equal(payload.bad, undefined);
  assert.equal(fixture.body.dataset.fitState, "accepted");
  assert.match(fixture.elements.submissionStatus.textContent, /Reference: 0123456789abcdef/);

  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls.length, 1, `${testCase.name}: accepted request is not repeated`);
}

for (const testCase of cases) {
  const responses = [
    async () => ({ status: 503 }),
    acceptedResponse,
  ];
  const fixture = setup(testCase, (...args) => responses.shift()(...args));
  fixture.advance(4000);
  await fixture.elements.form.dispatch("submit");
  fixture.elements.reviewConfirmed.checked = true;
  await fixture.elements.reviewConfirmed.dispatch("change");
  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.body.dataset.fitState, "error");
  assert.match(fixture.elements.submissionStatus.textContent, /Open in email or Copy request/);
  const frozenBody = fixture.calls[0][1].body;
  fixture.elements.form.values.contact_email = "changed@example.com";
  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls[1][1].body, frozenBody, `${testCase.name}: retry uses reviewed body`);
  assert.equal(fixture.body.dataset.fitState, "accepted");
}

console.log("Routed service fit-check frontend tests passed");
