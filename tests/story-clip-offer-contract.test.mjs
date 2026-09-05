import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const offer = read("../story-clip/index.html");
const fitCheck = read("../story-clip/fit-check/index.html");
const fitCheckScript = read("../story-clip/fit-check/fit-check.js");
const work = read("../work/index.html");
const sitemap = read("../sitemap.xml");
const publicOffer = [offer, fitCheck, fitCheckScript].join("\n");
const sampleVideo = fileURLToPath(new URL("../story-clip/sample/selected-provenance-clip.mp4", import.meta.url));
const samplePoster = fileURLToPath(new URL("../story-clip/sample/poster.png", import.meta.url));
const samplePacket = fileURLToPath(new URL("../story-clip/sample/story-clip-pilot-sample.zip", import.meta.url));
const sha256 = (path) => crypto.createHash("sha256").update(fs.readFileSync(path)).digest("hex");

assert.match(offer, /<link rel="canonical" href="https:\/\/lazying\.art\/story-clip\/">/);
assert.match(offer, /Story Clip Pilot/);
assert.match(offer, /fixed USD 250 pilot/i);
assert.doesNotMatch(offer, /\$250/);
assert.match(offer, /one recording you own, up to 30 minutes/i);
assert.match(offer, /exactly two timestamped candidate moments/i);
assert.match(offer, /hook rationale, cut rationale, and rights notes/i);
assert.match(offer, /one buyer-selected 9:16 clip up to 60 seconds/i);
assert.match(offer, /corrected burned-in captions in the recording's source language/i);
assert.match(offer, /matching SRT file/i);
assert.match(offer, /Caption and source ledger/);
assert.match(offer, /one consolidated list of caption, timing, or cut corrections within seven calendar days/i);
assert.match(offer, /id="sample"/);
assert.match(offer, /Two candidate notes\. One finished clip\. Every decision attached\./);
assert.match(offer, /sample\/selected-provenance-clip\.mp4/);
assert.match(offer, /sample\/story-clip-pilot-sample\.zip/);
assert.match(offer, /a51ac6f33ce28d9a42143cfc4651e859ec35b6bb\/examples\/story-clip-pilot/);
assert.match(offer, /project-owned synthetic process evidence, not customer work/i);
assert.equal(sha256(sampleVideo), "dc6f1ae24cd33947b56d3f52dae66926ce04958b8fd9a326462488462d0d3bfe");
assert.equal(sha256(samplePoster), "fb0d9636efdc7dcbeb485b5bc158b14b49efd9e87d987de4b7b09339440d0c58");
assert.equal(sha256(samplePacket), "17c50e951e555a09d841e28278edd0248e5c19c08e6de0ae3ba5ec6f35f68969");

for (const exclusion of [
  "translation unless separately scoped",
  "new filming",
  "paid stock",
  "publishing",
  "raw source redistribution",
  "performance or viral promises",
  "travel-client experience",
]) {
  assert.match(offer, new RegExp(exclusion, "i"));
}

for (const proof of [
  "https://www.youtube.com/watch?v=da0vnv1lQ_E",
  "https://www.youtube.com/watch?v=rVU37lPKPo8",
  "https://www.youtube.com/watch?v=9FjVTAgD9QE",
  'href="../work/"',
]) {
  assert.match(offer, new RegExp(proof.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}

assert.match(offer, /These are LazyingArt project pieces, not customer results/i);
assert.match(offer, /do not prove sales, reach, or viral performance/i);
assert.match(offer, /href="fit-check\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=story_clip_fit_check&amp;utm_content=pilot_hero">Check the recording/);
assert.match(offer, /Nothing is uploaded, and no answer is sent until you review it and choose Send/i);
assert.match(fitCheck, /Free fit check · no upload or payment/);
assert.match(fitCheck, /Do not upload or attach the recording yet/i);
assert.match(fitCheck, /data-testid="send-fit-check" type="button" disabled/);
assert.match(fitCheck, /encrypted private intake/i);
assert.match(fitCheck, />lach@lazying\.art<\/a>/);
assert.match(fitCheck, /Email is outside the encrypted intake/);
assert.match(fitCheckScript, /offer: "story_clip"/);
assert.match(fitCheckScript, /Request received for review\./);
assert.match(fitCheckScript, /https:\/\/blog\.lazying\.art\/wp-json\/lazyingart\/v1\/lkt-fit-check/);
assert.doesNotMatch(offer, /checkout|payment link|buy now/i);

const emails = [...publicOffer.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)].map(
  (match) => match[0].toLowerCase(),
);
assert.deepEqual([...new Set(emails)], ["lach@lazying.art"]);

assert.match(work, /Four small ways to begin/);
assert.match(
  work,
  /\.\.\/story-clip\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=story_clip_pilot&amp;utm_content=work_services/,
);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/story-clip\/<\/loc>/);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/story-clip\/fit-check\/<\/loc>/);

console.log("Story Clip Pilot offer contract passed");
