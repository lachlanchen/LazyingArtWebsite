import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const offer = read("../manuscript-sprint/index.html");
const fitCheck = read("../manuscript-sprint/fit-check/index.html");
const fitCheckScript = read("../manuscript-sprint/fit-check/fit-check.js");
const attributionBridge = read("../manuscript-sprint/attribution-bridge.js");
const publicOffer = [offer, fitCheck, fitCheckScript, attributionBridge].join("\n");

assert.match(publicOffer, /USD 250/);
assert.doesNotMatch(publicOffer, /\$250/);
assert.match(offer, /Up to 7,500 words/);
assert.match(offer, /one target template/i);
assert.match(offer, /three clean builds/i);
assert.match(offer, /up to ten build or formatting corrections/i);
assert.match(offer, /No ghostwriting\. No acceptance promises\./);
assert.match(offer, /not a client result or a journal outcome/);
assert.match(fitCheck, /no source upload or payment/i);
assert.match(fitCheck, /Do not paste manuscript text/);
assert.match(fitCheck, /Nothing has been sent/);
assert.match(fitCheck, />contact@lazying\.art<\/a>/);
assert.match(fitCheck, /Do not send manuscript files yet/);
assert.match(fitCheck, /Stripe request and private source transfer come afterward/);
assert.match(fitCheckScript, /event\.preventDefault\(\)/);
assert.match(fitCheckScript, /mailto:contact@lazying\.art/);
assert.match(fitCheckScript, /const attributionKeys = \["utm_source", "utm_medium", "utm_campaign", "utm_content"\]/);
assert.match(offer, /<script src="attribution-bridge\.js" defer><\/script>/);

console.log("Manuscript Build & Redline Sprint offer contract tests passed");
