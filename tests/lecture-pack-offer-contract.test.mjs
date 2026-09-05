import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");
const readBuffer = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)));

const offer = read("../lecture-pack/index.html");
const fitCheck = read("../lecture-pack/fit-check/index.html");
const fitCheckScript = read("../lecture-pack/fit-check/fit-check.js");
const attributionBridge = read("../lecture-pack/attribution-bridge.js");
const socialImage = readBuffer("../lecture-pack/assets/bilingual-lecture-pack-social.png");
const publicOffer = [offer, fitCheck, fitCheckScript, attributionBridge].join("\n");

assert.match(publicOffer, /USD 250/);
assert.doesNotMatch(publicOffer, /\$250/);
assert.match(offer, /up to 20 minutes/);
assert.match(offer, /One primary speaker/);
assert.match(offer, /Traditional Chinese or Japanese/);
assert.match(offer, /30–45 second/);
assert.match(offer, /up to ten consolidated corrections/i);
assert.match(offer, /customer-owned material or a clearly identified open license/);
assert.match(offer, /not paid-customer results/);
assert.match(offer, /15 timed lines across three languages/);
assert.doesNotMatch(offer, /45 aligned lines/);
assert.match(offer, /Delivery is ten business days/);
assert.match(offer, /Only one lecture pack is active at a time/);
assert.match(offer, /one consolidated list of up to ten timing, transcription, or terminology corrections within seven calendar days/);
assert.match(offer, /Cancel before source transfer or processing begins for a full refund/);
assert.match(offer, /USD 100 for the transcript and subtitles, USD 75 for the study companion, and USD 75 for the preview, manifest, and correction pass/);
assert.match(offer, /Working source copies are deleted within fourteen calendar days/);
assert.match(offer, /never reused as public proof without separate permission/);
assert.match(offer, /written clarification during the seven-day correction window/);
assert.match(
  offer,
  /https:\/\/lachlanchen\.github\.io\/LalaMedias\/videos\/aginti-autonomous-lab-ai-glasses-2b85b0d9\.html/,
);
assert.match(fitCheck, /Free fit check · no upload or payment/);
assert.match(fitCheck, /do not paste a transcript or send the recording yet/);
assert.match(fitCheck, /Nothing has been sent/);
assert.match(fitCheck, />contact@lazying\.art<\/a>/);
assert.match(fitCheck, /Do not send the source file yet/);
assert.match(fitCheck, /href="\.\.\/#terms">delivery, correction, cancellation, refund, retention, and support terms/);
assert.match(fitCheck, /Stripe request and private source transfer come after scope acceptance/);
assert.match(fitCheckScript, /event\.preventDefault\(\)/);
assert.match(fitCheckScript, /mailto:contact@lazying\.art/);
assert.match(fitCheckScript, /const attributionKeys = \["utm_source", "utm_medium", "utm_campaign", "utm_content"\]/);
assert.match(offer, /<script src="attribution-bridge\.js" defer><\/script>/);
assert.match(
  offer,
  /https:\/\/lazying\.art\/lecture-pack\/assets\/bilingual-lecture-pack-social\.png/,
);
assert.match(
  fitCheck,
  /https:\/\/lazying\.art\/lecture-pack\/assets\/bilingual-lecture-pack-social\.png/,
);
assert.equal(socialImage.subarray(1, 4).toString("ascii"), "PNG");
assert.equal(socialImage.readUInt32BE(16), 1200);
assert.equal(socialImage.readUInt32BE(20), 630);

console.log("Bilingual Lecture Pack offer contract tests passed");
