import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const offer = read("../book-specimen/index.html");
const fitCheck = read("../book-specimen/fit-check/index.html");
const fitCheckScript = read("../book-specimen/fit-check/fit-check.js");
const attributionBridge = read("../book-specimen/attribution-bridge.js");
const publicOffer = [offer, fitCheck, fitCheckScript, attributionBridge].join("\n");

assert.match(publicOffer, /USD 250/);
assert.doesNotMatch(publicOffer, /\$250/);
assert.match(offer, /Test one chapter/);
assert.match(offer, /up to 5,000 words/i);
assert.match(offer, /one agreed 6 × 9 print profile/i);
assert.match(offer, /one reflowable EPUB/i);
assert.match(offer, /up to ten.*corrections/i);
assert.match(offer, /translation, substantive editing, illustration, cover design, ISBNs, marketplace upload, printing, or a complete book/);
assert.match(offer, /no more than twelve supplied images/i);
assert.match(offer, /Download the sample packet/);
assert.match(offer, /e8512197cabe988ee597291364c0dab373e261ed/);
assert.match(offer, /398 KB packet/);
assert.match(offer, /3 chapters · 6 paragraphs/);
assert.match(offer, /Project-owned workflow evidence/);
assert.match(offer, /Delivery is ten business days/);
assert.match(offer, /Only one Book Specimen Sprint is active at a time/);
assert.match(offer, /one consolidated list of up to ten formatting, source-mapping, navigation, or packaging corrections within seven calendar days/);
assert.match(offer, /Cancel before source transfer or processing begins for a full refund/);
assert.match(offer, /USD 75 for source mapping and the style sheet, USD 100 for the print specimen, and USD 75 for the EPUB, validation, and correction pass/);
assert.match(offer, /Working source copies are deleted within fourteen calendar days/);
assert.match(offer, /never reused as public proof without separate permission/);
assert.match(fitCheck, /no source upload or payment/i);
assert.match(fitCheck, /Do not paste manuscript text or upload files/);
assert.match(fitCheck, /name="contact_email" type="email" required maxlength="254"/);
assert.match(fitCheck, /data-testid="send-fit-check" type="button" disabled hidden/);
assert.match(fitCheck, /Nothing has been sent/);
assert.match(fitCheck, /Do not send chapter files yet/);
assert.match(fitCheck, /Stripe request and private file transfer come afterward/);
assert.match(fitCheckScript, /event\.preventDefault\(\)/);
assert.match(fitCheckScript, /offer: "book_specimen"/);
assert.match(fitCheckScript, /const encryptedIntakeAvailable = false;/);
assert.doesNotMatch(fitCheckScript, /fetch\(/);
assert.match(fitCheckScript, /mailto:contact@lazying\.art/);
assert.match(fitCheckScript, /const attributionKeys = \["utm_source", "utm_medium", "utm_campaign", "utm_content"\]/);
assert.match(offer, /<script src="attribution-bridge\.js" defer><\/script>/);
assert.match(attributionBridge, /\^\\\/book-specimen\\\/fit-check/);

console.log("Book Specimen Sprint offer contract tests passed");
