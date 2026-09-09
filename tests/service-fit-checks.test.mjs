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
    name: "book_specimen",
    email: "contact@lazying.art",
    path: "../book-specimen/fit-check/fit-check.js",
    pageUrl: "https://lazying.art/book-specimen/fit-check/",
    values: {
      contact_email: "publisher@example.com",
      role: "Author and rights holder.",
      shape: "4,200 words in DOCX with six supplied images and captions.",
      language: "English primary text; no companion language.",
      output: "Black-and-white 6 × 9 print specimen and reflowable EPUB.",
      deadline: "Specimen needed in three weeks; full book is 55,000 words.",
      handling: "Delete working source copies after delivery.",
      constraints: "Preserve footnote numbering.",
      rights: true,
      scope: true,
      website: "",
    },
    expectedKeys: [
      "client_elapsed_ms", "constraints", "contact_email", "deadline",
      "handling", "language", "offer", "output", "rights_confirmed", "role",
      "scope_confirmed", "shape", "utm_campaign", "utm_source", "website",
    ],
  },
  {
    encryptedIntakeAvailable: true,
    name: "lkt",
    email: "contact@lazying.art",
    path: "../lkt/fit-check/fit-check.js",
    pageUrl: "https://lazying.art/lkt/fit-check/",
    values: {
      contact_email: "reader@example.com",
      collection: "A rights-cleared collection of multilingual research PDFs.",
      language_goal: "English explanations with Japanese reading aids.",
      readers: "Graduate students.",
      hardware: "Linux workstation, 16 GB RAM.",
      sample: "20 searchable PDFs, about 4 GB.",
      constraints: "Keep the collection local.",
      rights: true,
      scope: true,
      website: "",
    },
    expectedKeys: [
      "client_elapsed_ms", "collection", "constraints", "contact_email",
      "hardware", "language_goal", "offer", "readers", "rights_confirmed",
      "sample", "scope_confirmed", "utm_campaign", "utm_source", "website",
    ],
  },
  {
    encryptedIntakeAvailable: true,
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
    encryptedIntakeAvailable: true,
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
    encryptedIntakeAvailable: true,
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
  {
    encryptedIntakeAvailable: true,
    name: "openhi",
    email: "contact@lazying.art",
    path: "../openhi-reproducibility/fit-check/fit-check.js",
    pageUrl: "https://lazying.art/openhi-reproducibility/fit-check/",
    values: {
      contact_email: "lab@example.com",
      role: "Principal investigator authorized to share the test data.",
      environment: "Ubuntu 24.04, Python 3.11, NVIDIA GPU with 24 GB VRAM.",
      source: "One rights-cleared event-camera RAW recording and its metadata.",
      target_stage: "Reproduce segmentation and its documented diagnostic plot.",
      dependencies: "Metavision SDK is installed under the lab license.",
      constraints: "Keep supplied data local and delete working copies after delivery.",
      rights: true,
      scope: true,
      website: "",
    },
    expectedKeys: [
      "client_elapsed_ms", "constraints", "contact_email", "dependencies",
      "environment", "offer", "rights_confirmed", "role", "scope_confirmed",
      "source", "target_stage", "utm_campaign", "utm_source", "website",
    ],
  },
  {
    encryptedIntakeAvailable: true,
    name: "lazyremote",
    email: "contact@lazying.art",
    path: "../lazyremote/fit-check/fit-check.js",
    pageUrl: "https://lazying.art/lazyremote/fit-check/",
    values: {
      contact_email: "owner@example.com",
      target: "A private development workstation and its local web console.",
      endpoints: "Ubuntu 24.04 host, macOS client, and Android client.",
      relay: "One customer-controlled Debian VPS is already reachable.",
      network: "The workstation is behind CGNAT; no inbound ports are available.",
      goal: "SSH and a browser console for two named operators with separate access.",
      constraints: "Do not expose SSH or noVNC publicly.",
      rights: true,
      scope: true,
      website: "",
    },
    expectedKeys: [
      "client_elapsed_ms", "constraints", "contact_email", "endpoints", "goal",
      "network", "offer", "relay", "rights_confirmed", "scope_confirmed",
      "target", "utm_campaign", "utm_source", "website",
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
  const receipt = "ab".repeat(16);
  const fixture = setup(testCase, async () => ({
    status: 202,
    async json() {
      return {
        status: "accepted",
        message: "Request received for review.",
        receipt,
      };
    },
  }));
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
  assert.equal(
    fixture.elements.sendButton.disabled,
    !testCase.encryptedIntakeAvailable,
  );
  await fixture.elements.sendButton.dispatch("click");

  assert.match(fixture.elements.preview.textContent, /utm_source: owned_page/);
  assert.match(fixture.elements.preview.textContent, /utm_campaign: service_fit/);
  assert.doesNotMatch(fixture.elements.preview.textContent, /bad:/);
  if (testCase.encryptedIntakeAvailable) {
    assert.equal(fixture.calls.length, 1);
    assert.equal(fixture.body.dataset.fitState, "accepted");
    assert.match(fixture.elements.submissionStatus.textContent, new RegExp(receipt));
    const [endpoint, request] = fixture.calls[0];
    assert.equal(
      endpoint,
      "https://blog.lazying.art/wp-json/lazyingart/v1/lkt-fit-check",
    );
    assert.equal(request.method, "POST");
    assert.equal(request.credentials, "omit");
    const payload = JSON.parse(request.body);
    assert.equal(payload.offer, testCase.name);
    assert.deepEqual(Object.keys(payload).sort(), testCase.expectedKeys.sort());
  } else {
    assert.equal(fixture.calls.length, 0);
    assert.equal(fixture.body.dataset.fitState, "reviewed");
    assert.match(
      fixture.elements.submissionStatus.textContent,
      /Continue with Open in email or Copy request/,
    );
  }
}

{
  const lecture = cases.find((item) => item.name === "lecture");
  const fixture = setup(lecture, async () => ({ status: 503 }));
  await fixture.elements.form.dispatch("submit");
  fixture.elements.reviewConfirmed.checked = true;
  await fixture.elements.reviewConfirmed.dispatch("change");
  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls.length, 1);
  assert.equal(fixture.body.dataset.fitState, "error");
  assert.match(fixture.elements.submissionStatus.textContent, /Open in email or Copy request/);
  assert.equal(fixture.elements.reviewConfirmed.disabled, false);
}

console.log("Routed service fit-check frontend tests passed");
