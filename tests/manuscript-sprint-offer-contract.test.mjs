import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");
const readBuffer = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)));

const offer = read("../manuscript-sprint/index.html");
const fitCheck = read("../manuscript-sprint/fit-check/index.html");
const fitCheckScript = read("../manuscript-sprint/fit-check/fit-check.js");
const attributionBridge = read("../manuscript-sprint/attribution-bridge.js");
const socialImage = readBuffer("../manuscript-sprint/assets/manuscript-sprint-social.png");
const sampleImage = readBuffer("../manuscript-sprint/assets/manuscript-redline-sample.png");
const publicOffer = [offer, fitCheck, fitCheckScript, attributionBridge].join("\n");

assert.match(publicOffer, /USD 250/);
assert.doesNotMatch(publicOffer, /\$250/);
assert.match(offer, /Up to 7,500 words/);
assert.match(offer, /one target template/i);
assert.match(offer, /three clean builds/i);
assert.match(offer, /up to ten build or formatting corrections/i);
assert.match(offer, /No ghostwriting\. No acceptance promises\./);
assert.match(offer, /not a client result or a journal outcome/);
assert.match(offer, /See exactly what comes back/);
assert.match(offer, /Download the sample packet/);
assert.match(
  offer,
  /Open build blockers<\/strong><span>This one-page sample<\/span><b>0<\/b>/,
);
assert.match(offer, /manuscript-redline-sample\.png/);
assert.match(
  offer,
  /LazyPromotion\/raw\/183d64325f4e943f14beb6a975a518eb593175f0\/examples\/latex-redline\/artifacts\/sample-delivery\.zip/,
);
assert.match(offer, /sample-delivery\.zip\.sha256/);
assert.match(
  offer,
  /not customer work, scientific review, journal compliance, or a publication result/,
);
assert.match(offer, /Delivery is ten business days/);
assert.match(offer, /Only one manuscript sprint is active at a time/);
assert.match(offer, /one consolidated list of up to ten build or formatting corrections within seven calendar days/);
assert.match(offer, /Cancel before source transfer or processing begins for a full refund/);
assert.match(offer, /USD 100 for the clean build, USD 75 for the template and issue ledger, and USD 75 for the redline and correction pass/);
assert.match(offer, /Working source copies are deleted within fourteen calendar days/);
assert.match(offer, /never reused as public proof without separate permission/);
assert.match(offer, /written clarification during the seven-day correction window/);
assert.match(fitCheck, /no source upload or payment/i);
assert.match(fitCheck, /Do not paste manuscript text/);
assert.match(fitCheck, /Nothing has been sent/);
assert.match(fitCheck, />contact@lazying\.art<\/a>/);
assert.match(fitCheck, /Do not send manuscript files yet/);
assert.match(fitCheck, /href="\.\.\/#terms">delivery, correction, cancellation, refund, retention, and support terms/);
assert.match(fitCheck, /Stripe request and private source transfer come afterward/);
assert.match(fitCheckScript, /event\.preventDefault\(\)/);
assert.match(fitCheckScript, /mailto:contact@lazying\.art/);
assert.match(fitCheckScript, /const attributionKeys = \["utm_source", "utm_medium", "utm_campaign", "utm_content"\]/);
assert.match(offer, /<script src="attribution-bridge\.js" defer><\/script>/);
assert.match(
  offer,
  /https:\/\/lazying\.art\/manuscript-sprint\/assets\/manuscript-sprint-social\.png/,
);
assert.match(
  fitCheck,
  /https:\/\/lazying\.art\/manuscript-sprint\/assets\/manuscript-sprint-social\.png/,
);
assert.equal(socialImage.subarray(1, 4).toString("ascii"), "PNG");
assert.equal(socialImage.readUInt32BE(16), 1200);
assert.equal(socialImage.readUInt32BE(20), 630);
assert.equal(sampleImage.subarray(1, 4).toString("ascii"), "PNG");
assert.equal(sampleImage.readUInt32BE(16), 993);
assert.equal(sampleImage.readUInt32BE(20), 1404);

console.log("Manuscript Build & Redline Sprint offer contract tests passed");
