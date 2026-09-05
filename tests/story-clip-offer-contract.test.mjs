import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const offer = read("../story-clip/index.html");
const work = read("../work/index.html");
const sitemap = read("../sitemap.xml");

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
assert.match(offer, /mailto:contact@lazying\.art\?subject=Story%20Clip%20Pilot/);
assert.match(offer, /does not send automatically/i);
assert.match(offer, /Do not attach the recording until the scope and handling terms are accepted/i);
assert.doesNotMatch(offer, /\/fit-check\//);
assert.doesNotMatch(offer, /checkout|payment link|buy now/i);

const emails = [...offer.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)].map(
  (match) => match[0].toLowerCase(),
);
assert.deepEqual([...new Set(emails)], ["contact@lazying.art"]);

assert.match(work, /Four small ways to begin/);
assert.match(
  work,
  /\.\.\/story-clip\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=story_clip_pilot&amp;utm_content=work_services/,
);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/story-clip\/<\/loc>/);

console.log("Story Clip Pilot offer contract passed");
