import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const offer = read("../video/brand-film/index.html");
const fitCheck = read("../video/brand-film/fit-check/index.html");
const fitCheckScript = read("../video/brand-film/fit-check/fit-check.js");
const portfolio = read("../video/index.html");
const sitemap = read("../sitemap.xml");

assert.match(offer, /<link rel="canonical" href="https:\/\/lazying\.art\/video\/brand-film\/">/);
assert.match(offer, /AI Clip Assembly Pilot/);
assert.match(offer, /fixed USD 500 pilot/i);
assert.match(offer, /up to six AI-generated clips you control/i);
assert.match(offer, /totalling no more than 45 seconds/i);
assert.match(offer, /one coherent 30–45 second brand film/i);
assert.match(offer, /one 25–30 second web cut/i);
assert.match(offer, /one consolidated list/i);
assert.match(offer, /within seven calendar days/i);
assert.match(offer, /source manifest/i);
assert.match(offer, /Do not attach the original files yet/i);
assert.match(offer, /new AI generation/);
assert.match(offer, /shot recreation/);
assert.match(offer, /Native Premiere Pro, After Effects, Final Cut, or DaVinci Resolve project delivery is included only when/i);
assert.match(offer, /Customer footage is not reused as public proof without separate permission/i);
assert.match(offer, /href="fit-check\/"/);
assert.doesNotMatch(offer, /viral|ROAS|conversion rate|guaranteed/i);

assert.match(fitCheck, /<link rel="canonical" href="https:\/\/lazying\.art\/video\/brand-film\/fit-check\/">/);
assert.match(fitCheck, /Free fit check · no file transfer or payment/);
assert.match(fitCheck, /Up to six existing AI-generated clips you control/);
for (const field of [
  "contact_email",
  "clip_inventory",
  "rights_scope",
  "audience_destination",
  "story",
  "finish",
  "delivery",
  "rights",
  "scope",
]) {
  assert.match(fitCheck, new RegExp(`name="${field}"`));
}
assert.match(fitCheck, /Review request/);
assert.match(fitCheck, /Open in email/);
assert.match(fitCheck, /Copy request/);
assert.doesNotMatch(fitCheck, /type="file"/);
assert.match(fitCheckScript, /offer: "ai_clip_assembly"/);
assert.match(fitCheckScript, /mailto:lach@lazying\.art/);
assert.match(fitCheckScript, /Nothing has been sent/);
assert.doesNotMatch(fitCheckScript, /fetch\(|endpoint|XMLHttpRequest/);

assert.match(portfolio, /href="brand-film\/">See the USD 500 assembly pilot/);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/video\/brand-film\/<\/loc>/);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/video\/brand-film\/fit-check\/<\/loc>/);

console.log("AI Clip Assembly offer contract passed");
