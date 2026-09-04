import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const offer = read("../lecture-pack/index.html");
const fitCheck = read("../lecture-pack/fit-check/index.html");
const fitCheckScript = read("../lecture-pack/fit-check/fit-check.js");
const attributionBridge = read("../lecture-pack/attribution-bridge.js");
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
assert.match(
  offer,
  /https:\/\/lachlanchen\.github\.io\/LalaMedias\/videos\/aginti-autonomous-lab-ai-glasses-2b85b0d9\.html/,
);
assert.match(fitCheck, /Free fit check · no upload or payment/);
assert.match(fitCheck, /do not paste a transcript or send the recording yet/);
assert.match(fitCheck, /Nothing has been sent/);
assert.match(fitCheck, />contact@lazying\.art<\/a>/);
assert.match(fitCheck, /Do not send the source file yet/);
assert.match(fitCheck, /Stripe request and private source transfer come after scope acceptance/);
assert.match(fitCheckScript, /event\.preventDefault\(\)/);
assert.match(fitCheckScript, /mailto:contact@lazying\.art/);
assert.match(fitCheckScript, /const attributionKeys = \["utm_source", "utm_medium", "utm_campaign", "utm_content"\]/);
assert.match(offer, /<script src="attribution-bridge\.js" defer><\/script>/);

console.log("Bilingual Lecture Pack offer contract tests passed");
