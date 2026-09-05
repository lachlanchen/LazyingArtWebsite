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
    email: "contact@lazying.art",
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
    email: "contact@lazying.art",
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
  {
    name: "story_clip",
    email: "lach@lazying.art",
    path: "../story-clip/fit-check/fit-check.js",
    pageUrl: "https://lazying.art/story-clip/fit-check/",
    values: {
      contact_email: "founder@example.com",
      source: "Twenty-minute MP4 interview recorded by our team.",
      language: "English, with supplied product names.",
      rights_scope: "We control the recording, voices, faces, music, locations, and marks requested for this clip.",
      audience_platform: "Prospective customers on LinkedIn and Instagram.",
      goal: "Show the moment the founder explains why the product exists.",
      constraints: "Avoid performance claims and keep the supplied spelling.",
      rights: true,
      scope: true,
      website: "",
    },
    expectedKeys: [
      "audience_platform", "client_elapsed_ms", "constraints", "contact_email",
      "goal", "language", "offer", "rights_confirmed", "rights_scope",
      "scope_confirmed", "source", "utm_campaign", "utm_source", "website",
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

for (const testCase of cases) {
  const fixture = setup(testCase, async () => {
    throw new Error("disabled encrypted intake must not call fetch");
  });
  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls.length, 0, `${testCase.name}: send is inert before review`);

  fixture.advance(5000);
  const review = await fixture.elements.form.dispatch("submit");
  assert.equal(review.defaultPrevented, true);
  assert.equal(fixture.calls.length, 0, `${testCase.name}: review does not send`);
  assert.equal(fixture.elements.panel.hidden, false);
  assert.equal(fixture.elements.sendButton.disabled, true);
  assert.match(fixture.elements.preview.textContent, /Contact email:/);
  assert.match(
    fixture.elements.openEmail.href,
    new RegExp(`^mailto:${testCase.email.replace(".", "\\.")}\\?`),
  );

  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls.length, 0, `${testCase.name}: confirmation gate holds`);
  fixture.elements.reviewConfirmed.checked = true;
  await fixture.elements.reviewConfirmed.dispatch("change");
  assert.equal(fixture.elements.sendButton.disabled, true);
  await fixture.elements.sendButton.dispatch("click");

  assert.equal(fixture.calls.length, 0);
  assert.equal(fixture.body.dataset.fitState, "reviewed");
  assert.match(fixture.elements.preview.textContent, /utm_source: owned_page/);
  assert.match(fixture.elements.preview.textContent, /utm_campaign: service_fit/);
  assert.doesNotMatch(fixture.elements.preview.textContent, /bad:/);
  assert.match(
    fixture.elements.submissionStatus.textContent,
    /Continue with Open in email or Copy request/,
  );
}

console.log("Routed service fit-check frontend tests passed");
