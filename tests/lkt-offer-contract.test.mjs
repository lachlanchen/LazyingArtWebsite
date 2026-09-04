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
assert.match(offer, /button primary" href="fit-check\/">Check my collection/);
assert.match(offer, /button secondary" href="sample-report\/">See the sample deliverable/);
assert.match(offer, /No account or upload/);
assert.match(offer, /sends nothing automatically/);
assert.match(offer, /Hardware, shipping, custom OCR, and production deployment are excluded/);
assert.match(
  offer,
  /3788\/test-research-pdf-collection-before-local-rag\.html\?utm_source=lkt&amp;utm_medium=website&amp;utm_campaign=scientific_pdf_integrity&amp;utm_content=research_use_case/,
);
assert.ok(
  offer.indexOf('href="fit-check/">Check my collection') <
    offer.indexOf('href="sample-report/">See the sample deliverable'),
  "the hero must make the low-risk fit check the primary action",
);

console.log("LKT offer contract tests passed");
