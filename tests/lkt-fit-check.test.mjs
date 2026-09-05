import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const script = fs.readFileSync(
  fileURLToPath(new URL("../lkt/fit-check/fit-check.js", import.meta.url)),
  "utf8",
);
const html = fs.readFileSync(
  fileURLToPath(new URL("../lkt/fit-check/index.html", import.meta.url)),
  "utf8",
);

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.checked = false;
    this.disabled = false;
    this.focusCount = 0;
    this.handlers = new Map();
    this.hidden = false;
    this.href = "";
    this.scrollCount = 0;
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

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  scrollIntoView() {
    this.scrollCount += 1;
  }

  select() {}

  setAttribute(name, value) {
    this.attributes.set(name, value);
  }
}

const defaultValues = () => ({
  contact_email: "reader@example.com",
  collection: "中英日 research notes and papers",
  language_goal: "English explanations with Japanese reading aids",
  readers: "Graduate students",
  hardware: "Linux workstation, 16 GB RAM",
  sample: "20 searchable PDFs, about 4 GB",
  constraints: "Keep the collection local.",
  rights: true,
  scope: true,
  website: "",
});

function setup({
  pageUrl = "https://lazying.art/lkt/fit-check/",
  referrer = "",
  fetchImpl = async () => ({
    status: 202,
    async json() {
      return {
        status: "accepted",
        message: "Request received for review.",
        receipt: "0123456789abcdef0123456789abcdef",
      };
    },
  }),
} = {}) {
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
  elements.form.values = defaultValues();
  elements.form.valid = true;
  elements.form.reportCount = 0;
  elements.form.checkValidity = () => elements.form.valid;
  elements.form.reportValidity = () => {
    elements.form.reportCount += 1;
  };
  elements.form.controls = Array.from({ length: 10 }, () => new FakeElement());
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
  const location = new URL(pageUrl);
  const body = new FakeElement();
  body.dataset = { fitState: "editing" };
  body.appendChild = () => {};
  const copied = [];
  const calls = [];
  let now = 10000;

  class MockFormData {
    constructor(form) {
      this.values = form.values;
    }

    get(name) {
      if (!(name in this.values)) {
        return null;
      }
      if (typeof this.values[name] === "boolean") {
        return this.values[name] ? "on" : null;
      }
      return this.values[name];
    }
  }

  const document = {
    body,
    referrer,
    createElement: () => new FakeElement(),
    execCommand: () => true,
    querySelector: (selector) => selectors.get(selector) || null,
  };
  const context = {
    Date: { now: () => now },
    FormData: MockFormData,
    TextEncoder,
    URL,
    URLSearchParams,
    document,
    fetch: (...args) => {
      calls.push(args);
      return fetchImpl(...args);
    },
    navigator: {
      clipboard: {
        async writeText(value) {
          copied.push(value);
        },
      },
    },
    window: {
      location: { origin: location.origin, search: location.search },
    },
  };
  vm.runInNewContext(script, context);

  return {
    advance(milliseconds) {
      now += milliseconds;
    },
    body,
    calls,
    copied,
    elements,
  };
}

async function review(fixture) {
  fixture.advance(5000);
  const event = await fixture.elements.form.dispatch("submit");
  assert.equal(event.defaultPrevented, true);
}

async function confirmAndSend(fixture) {
  fixture.elements.reviewConfirmed.checked = true;
  await fixture.elements.reviewConfirmed.dispatch("change");
  assert.equal(fixture.elements.sendButton.disabled, false);
  await fixture.elements.sendButton.dispatch("click");
}

assert.match(
  script,
  /https:\/\/blog\.lazying\.art\/wp-json\/lazyingart\/v1\/lkt-fit-check/,
);
assert.match(html, /name="contact_email" type="email" required maxlength="254"/);
assert.match(html, /name="website" type="text" tabindex="-1" autocomplete="off"/);
assert.match(html, /data-testid="send-fit-check" type="button" disabled/);
assert.match(html, /nothing is sent while you fill in the form or choose “Review request.”/);
assert.match(html, /reviewed answers are encrypted for LazyingArt’s private intake/);
assert.doesNotMatch(html, /type="file"/);
assert.doesNotMatch(html, /backend is live/i);

{
  const fixture = setup();
  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls.length, 0, "send is inert before review");
  await review(fixture);
  assert.equal(fixture.calls.length, 0, "review does not send");
  assert.equal(fixture.elements.panel.hidden, false);
  assert.equal(fixture.elements.sendButton.disabled, true);
  assert.equal(fixture.elements.heading.focusCount, 1);
  assert.match(fixture.elements.preview.textContent, /Contact email:\nreader@example\.com/);
  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls.length, 0, "send is inert until review is confirmed");
}

{
  const fixture = setup({
    pageUrl:
      "https://lazying.art/lkt/fit-check/?utm_source=instagram&utm_medium=social%3Fbad&utm_campaign=local_knowledge_terminal&utm_content=report_hero&utm_term=ignored",
  });
  await review(fixture);
  await confirmAndSend(fixture);
  assert.equal(fixture.calls.length, 1);
  const [url, options] = fixture.calls[0];
  assert.equal(
    url,
    "https://blog.lazying.art/wp-json/lazyingart/v1/lkt-fit-check",
  );
  assert.equal(options.method, "POST");
  assert.equal(options.credentials, "omit");
  assert.deepEqual(Object.keys(options.headers), ["Content-Type"]);
  assert.equal(options.headers["Content-Type"], "application/json");
  const payload = JSON.parse(options.body);
  assert.deepEqual(Object.keys(payload).sort(), [
    "client_elapsed_ms",
    "collection",
    "constraints",
    "contact_email",
    "hardware",
    "language_goal",
    "offer",
    "readers",
    "rights_confirmed",
    "sample",
    "scope_confirmed",
    "utm_campaign",
    "utm_content",
    "utm_source",
    "website",
  ]);
  assert.equal(payload.client_elapsed_ms, 5000);
  assert.equal(payload.offer, "lkt");
  assert.equal(payload.utm_source, "instagram");
  assert.equal(payload.utm_medium, undefined);
  assert.equal(payload.utm_term, undefined);
  assert.equal(payload.rights_confirmed, true);
  assert.equal(payload.scope_confirmed, true);
  assert.equal(payload.website, "");
  assert.equal(fixture.body.dataset.fitState, "accepted");
  assert.equal(
    fixture.elements.submissionStatus.textContent,
    "Request received for review. Reference: 0123456789abcdef0123456789abcdef",
  );
  assert.equal(fixture.elements.submissionStatus.focusCount, 1);
}

{
  const responses = [
    { status: 503 },
    {
      status: 202,
      async json() {
        return {
          status: "accepted",
          message: "Request received for review.",
          receipt: "fedcba9876543210fedcba9876543210",
        };
      },
    },
  ];
  const fixture = setup({
    fetchImpl: async () => responses.shift(),
  });
  await review(fixture);
  await confirmAndSend(fixture);
  assert.equal(fixture.body.dataset.fitState, "error");
  assert.match(fixture.elements.submissionStatus.textContent, /Open in email or Copy request/);
  assert.equal(fixture.elements.sendButton.disabled, false, "reviewed retry is available");
  const firstBody = fixture.calls[0][1].body;
  fixture.elements.form.values.collection = "Changed after review";
  await fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls.length, 2);
  assert.equal(fixture.calls[1][1].body, firstBody, "retry reuses frozen body");
  assert.equal(JSON.parse(firstBody).collection, "中英日 research notes and papers");
  assert.equal(fixture.body.dataset.fitState, "accepted");
}

{
  let resolveFetch;
  const fixture = setup({
    fetchImpl: () =>
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
  });
  await review(fixture);
  fixture.elements.reviewConfirmed.checked = true;
  await fixture.elements.reviewConfirmed.dispatch("change");
  const first = fixture.elements.sendButton.dispatch("click");
  const second = fixture.elements.sendButton.dispatch("click");
  assert.equal(fixture.calls.length, 1, "double send is suppressed synchronously");
  resolveFetch({
    status: 202,
    async json() {
      return {
        status: "accepted",
        message: "Request received for review.",
        receipt: "11111111111111111111111111111111",
      };
    },
  });
  await Promise.all([first, second]);
  assert.equal(fixture.calls.length, 1);
}

{
  const fixture = setup({
    fetchImpl: async () => ({
      status: 202,
      async json() {
        return {
          status: "accepted",
          message: "Request received for review.",
          receipt: "not-a-receipt",
        };
      },
    }),
  });
  await review(fixture);
  await confirmAndSend(fixture);
  assert.equal(fixture.body.dataset.fitState, "error");
  assert.match(fixture.elements.submissionStatus.textContent, /Open in email or Copy request/);
}

{
  const fixture = setup();
  await review(fixture);
  assert.match(fixture.elements.openEmail.href, /^mailto:contact@lazying\.art\?/);
  assert.match(fixture.elements.openEmail.href, /body=/);
  await fixture.elements.copyButton.dispatch("click");
  assert.equal(fixture.copied.length, 1);
  assert.equal(fixture.copied[0], fixture.elements.preview.textContent);
  assert.match(fixture.elements.submissionStatus.textContent, /Nothing was sent by copying/);
}

{
  const fixture = setup();
  fixture.elements.form.values.collection = "界".repeat(5000);
  await review(fixture);
  assert.equal(fixture.body.dataset.fitState, "invalid");
  assert.equal(fixture.elements.panel.hidden, true);
  assert.equal(fixture.calls.length, 0);
  assert.match(fixture.elements.formStatus.textContent, /shorten the answers/);
}

assert.match(html, /<noscript>[\s\S]*mailto:contact@lazying\.art[\s\S]*<\/noscript>/);
assert.match(html, /JavaScript is required for the local review step/);

console.log("LKT fit-check frontend tests passed");
