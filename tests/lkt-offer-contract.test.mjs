import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const offer = read("../lkt/index.html");
const homepage = read("../index.html");
const fitCheck = read("../lkt/fit-check/index.html");
const fitCheckScript = read("../lkt/fit-check/fit-check.js");
const sampleReport = read("../lkt/sample-report/index.html");
const publicOffer = [offer, fitCheck, fitCheckScript, sampleReport].join("\n");

assert.match(publicOffer, /USD 250/);
assert.doesNotMatch(publicOffer, /\$250/);
assert.match(fitCheck, /Free fit check · no payment/);
assert.match(fitCheck, /No account or source upload/);
assert.match(fitCheck, /nothing is sent automatically/);
assert.match(fitCheck, /excludes hardware, shipping, custom OCR, and production deployment/);
assert.match(fitCheck, /Nothing has been sent/);
assert.match(fitCheck, /encrypted for LazyingArt’s private intake/);
assert.match(fitCheck, />contact@lazying\.art<\/a>/);
assert.match(fitCheck, /name="contact_email" type="email" required/);
assert.match(fitCheck, /name="website" type="text" tabindex="-1"/);
assert.match(fitCheck, /data-testid="send-fit-check" type="button" disabled/);
assert.match(fitCheck, /I reviewed the request above/);
assert.match(fitCheck, /Do not send source files yet/);
assert.match(fitCheck, /A Stripe payment request comes after scope acceptance, never at this stage/);
assert.match(fitCheckScript, /event\.preventDefault\(\)/);
assert.match(fitCheckScript, /mailto:contact@lazying\.art/);
assert.match(fitCheckScript, /const attributionKeys = \["utm_source", "utm_medium", "utm_campaign", "utm_content"\]/);
assert.match(fitCheckScript, /https:\/\/blog\.lazying\.art\/wp-json\/lazyingart\/v1\/lkt-fit-check/);
assert.match(fitCheckScript, /Request received for review\./);
assert.match(offer, /button primary" href="fit-check\/">Check my collection/);
assert.match(offer, /button secondary" href="sample-report\/">See the sample deliverable/);
assert.match(offer, /No account or upload/);
assert.match(offer, /sends nothing automatically/);
assert.match(offer, /Hardware, shipping, custom OCR, and production deployment are excluded/);
assert.match(offer, /A supplied device is a separate, quote-only product/);
assert.match(offer, /A tested reference build, not included hardware/);
assert.match(homepage, /A collection-fit service for private, book-grounded multilingual cards on your existing machine/);
assert.match(homepage, />Service pilot <span/);
assert.match(
  offer,
  /3788\/test-research-pdf-collection-before-local-rag\.html\?utm_source=lkt&amp;utm_medium=website&amp;utm_campaign=scientific_pdf_integrity&amp;utm_content=research_use_case/,
);
assert.match(
  sampleReport,
  /github\.com\/lachlanchen\/LazyPromotion\/tree\/main\/examples\/lkt-scientific-pdf-fit/,
);
assert.match(sampleReport, /Twenty fixed questions/);
assert.match(sampleReport, /no-go boundary for OCR/);
assert.ok(
  offer.indexOf('href="fit-check/">Check my collection') <
    offer.indexOf('href="sample-report/">See the sample deliverable'),
  "the hero must make the low-risk fit check the primary action",
);

console.log("LKT offer contract tests passed");
