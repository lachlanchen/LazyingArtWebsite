import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (path) => fs.readFileSync(fileURLToPath(new URL(path, import.meta.url)), "utf8");
const page = read("../pronunciation-mini-lesson/fit-check/index.html");
const script = read("../pronunciation-mini-lesson/fit-check/fit-check.js");
const sitemap = read("../sitemap.xml");

assert.match(page, /Free fit check · no learner recording or payment/);
assert.match(page, /https:\/\/l-and-n\.lazying\.art\/lessons\/light-vs-night\//);
assert.match(page, /data-testid="review-request"/);
assert.match(page, /data-testid="send-fit-check" type="button" disabled/);
assert.match(page, /nothing is sent while you fill in the form/i);
assert.match(page, /Do not attach or paste learner recordings, names, or other personal data\./);
assert.match(page, /fixed USD 250 lesson excludes clinical assessment/);
assert.doesNotMatch(page, /type="file"/);
assert.doesNotMatch(page, /checkout\.stripe|buy\.stripe/);

for (const name of [
  "contact_email", "contrast", "learner_context", "language", "intended_use",
  "source", "deadline", "constraints", "rights", "scope", "website",
]) {
  assert.match(page, new RegExp(`name="${name}"`));
}

assert.match(script, /offer: "pronunciation_lesson"/);
assert.match(script, /const encryptedIntakeAvailable = true;/);
assert.match(script, /credentials: "omit"/);
assert.match(script, /cache: "no-store"/);
assert.match(script, /response\.status !== 202/);
assert.match(script, /reviewConfirmed\.checked/);
assert.match(script, /mailto:contact@lazying\.art/);
assert.match(
  script,
  /https:\/\/blog\.lazying\.art\/wp-json\/lazyingart\/v1\/lkt-fit-check/,
);
assert.match(
  sitemap,
  /<loc>https:\/\/lazying\.art\/pronunciation-mini-lesson\/fit-check\/<\/loc>/,
);

console.log("Pronunciation mini-lesson fit-check contract passed");
