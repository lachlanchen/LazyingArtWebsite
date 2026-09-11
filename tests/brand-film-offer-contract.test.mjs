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
const sampleReadme = read("../video/brand-film/sample/README.md");
const sampleManifest = JSON.parse(read("../video/brand-film/sample/manifest.json"));
const sampleBuild = read("../video/brand-film/sample/build-sample.sh");

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
assert.match(offer, /id="sample"/);
assert.match(offer, /Six project-owned, eight-second AI-assisted scenes/);
assert.match(offer, /41\.958-second master/);
assert.match(offer, /27\.816-second web cut/);
assert.match(offer, /not customer work or an ad-performance result/i);
assert.match(offer, /sample\/madeira-six-clip-master\.mp4/);
assert.match(offer, /sample\/madeira-four-beat-web-cut\.mp4/);
assert.match(offer, /sample\/manifest\.json/);
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
assert.match(portfolio, /Four finished pieces/);
assert.match(portfolio, /brand-film\/sample\/madeira-six-clip-master\.mp4/);
assert.match(portfolio, /href="brand-film\/#sample">Watch both cuts and inspect the build/);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/video\/brand-film\/<\/loc>/);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/video\/brand-film\/fit-check\/<\/loc>/);

assert.equal(sampleManifest.sources.length, 6);
assert.equal(sampleManifest.source_total_seconds, 43.2);
assert.equal(sampleManifest.outputs.length, 2);
assert.equal(sampleManifest.outputs[0].duration_seconds, 41.958333);
assert.equal(sampleManifest.outputs[1].duration_seconds, 27.816);
assert.equal(
  sampleManifest.outputs[0].sha256,
  "ceb4f23f963e2571ac57b2a3023d76c00dba813c74e728a6371482e03a4d2f47",
);
assert.equal(
  sampleManifest.outputs[1].sha256,
  "836af75cd57bcba8d72a50b3bd57020d92614d54fbe280dadb8347c6765fa653",
);
assert.match(sampleManifest.claim_boundary, /not customer work or advertising performance/i);
assert.match(sampleReadme, /project-owned editing sample/i);
assert.match(sampleReadme, /not customer work or evidence of advertising performance/i);
assert.match(sampleBuild, /sources=\(/);
assert.match(sampleBuild, /crop=1024:576:0:48/);

for (const filename of [
  "madeira-six-clip-master.mp4",
  "madeira-four-beat-web-cut.mp4",
  "madeira-six-clip-poster.jpg",
  "madeira-six-source-contact-sheet.jpg",
]) {
  assert.ok(
    fs.statSync(fileURLToPath(new URL(`../video/brand-film/sample/${filename}`, import.meta.url))).size > 0,
    `${filename} must be present and non-empty`,
  );
}

console.log("AI Clip Assembly offer contract passed");
