import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const offer = read("../lkt/index.html");
const fitCheck = read("../lkt/fit-check/index.html");
const fitCheckScript = read("../lkt/fit-check/fit-check.js");
const sampleReport = read("../lkt/sample-report/index.html");
const publicOffer = [offer, fitCheck, fitCheckScript, sampleReport].join("\n");

assert.match(publicOffer, /USD 250/);
assert.doesNotMatch(publicOffer, /\$250/);
assert.match(fitCheck, /Free fit check · no payment/);
assert.match(fitCheck, /No account, upload, or automatic submission/);
assert.match(fitCheck, /excludes hardware, shipping, custom OCR, and production deployment/);
assert.match(fitCheck, /Nothing has been sent/);
assert.match(fitCheck, />contact@lazying\.art<\/a>/);
assert.match(fitCheck, /Do not send source files yet/);
assert.match(fitCheck, /A Stripe payment request comes after scope acceptance, never at this stage/);
assert.match(fitCheckScript, /event\.preventDefault\(\)/);
assert.match(fitCheckScript, /mailto:contact@lazying\.art/);
assert.match(fitCheckScript, /const attributionKeys = \["utm_source", "utm_medium", "utm_campaign", "utm_content"\]/);
assert.match(offer, /button primary" href="sample-report\/">Read the complete sample fit report/);
assert.match(offer, /button secondary" href="fit-check\/">Start the free fit check/);
assert.ok(
  offer.indexOf('href="sample-report/">Read the complete sample fit report') <
    offer.indexOf('href="fit-check/">Start the free fit check'),
  "the hero must present project-owned proof before the inquiry step",
);

console.log("LKT offer contract tests passed");
