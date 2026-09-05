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
assert.match(publicOffer, /12 source units/);
assert.match(publicOffer, /20 test questions/);
assert.match(publicOffer, /up to two cited browser cards/);
assert.match(publicOffer, /one factual correction pass/);
assert.match(offer, /defines one source unit/);
assert.match(fitCheck, /excludes hardware, shipping, custom OCR, bulk conversion, production deployment, and ongoing support/);
assert.match(fitCheck, /Nothing has been sent/);
assert.match(fitCheck, /Continue with your email app or copy the reviewed request/);
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
assert.match(fitCheckScript, /const encryptedIntakeAvailable = false;/);
assert.match(fitCheckScript, /Request received for review\./);
assert.match(offer, /button primary" href="fit-check\/">Check my collection/);
assert.match(offer, /button secondary" href="sample-report\/">See the sample deliverable/);
assert.match(offer, /No account or source upload/);
assert.match(offer, /Nothing is sent while you fill in or review the fit check/);
assert.match(offer, /open the prepared request in your email app or copy it/);
assert.match(sampleReport, /opening the prepared request in your email app or copying it/);
assert.doesNotMatch(offer + sampleReport, /sends nothing automatically/);
assert.match(offer, /Hardware, shipping, custom OCR, bulk conversion, production deployment, and ongoing support are excluded/);
assert.match(offer, /A supplied device is a separate, quote-only product/);
assert.match(offer, /A tested reference build, not included hardware/);
assert.match(offer, /Delivery is ten business days after the scope is accepted/);
assert.match(offer, /one consolidated list of up to ten factual corrections within seven calendar days/);
assert.match(offer, /Cancel before source transfer or processing begins for a full refund/);
assert.match(offer, /USD 75 for the map, USD 125 for the evaluation and cards, and USD 50 for the report and correction pass/);
assert.match(offer, /Working source copies are deleted within fourteen calendar days/);
assert.match(offer, /hosting, maintenance, hardware support, and ongoing operation are excluded/);
assert.match(fitCheck, /href="\.\.\/#terms">Read timing, cancellation, retention, and support terms/);
assert.match(offer, /width="1672" height="941"/);
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
assert.match(offer, /16,800 current-code structured records/);
assert.match(sampleReport, /<strong>16,800<\/strong><span>current-code records<\/span>/);
assert.match(sampleReport, /<td>4,018<\/td>/);
assert.match(sampleReport, /<td>5,179<\/td>/);
assert.doesNotMatch(publicOffer, /19,119|6,327|5,189|5\.8 MB/);
assert.match(offer, /Terminology and language study/);
assert.match(offer, /rights-cleared glossary, dictionary, or reading collection/);
assert.match(offer, /When the source supports it/);
assert.ok(
  offer.indexOf('href="fit-check/">Check my collection') <
    offer.indexOf('href="sample-report/">See the sample deliverable'),
  "the hero must make the low-risk fit check the primary action",
);

console.log("LKT offer contract tests passed");
