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
assert.match(fitCheckScript, /event\.preventDefault\(\)/);
assert.match(fitCheckScript, /mailto:contact@lazying\.art/);
assert.match(fitCheckScript, /const attributionKeys = \["utm_source", "utm_medium", "utm_campaign", "utm_content"\]/);

console.log("LKT offer contract tests passed");
