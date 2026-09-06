import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const offer = read("../video/brand-film/index.html");
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
assert.match(offer, /mailto:lach@lazying\.art/);
assert.match(offer, /new AI generation/);
assert.match(offer, /shot recreation/);
assert.match(offer, /Native Premiere Pro, After Effects, Final Cut, or DaVinci Resolve project delivery is included only when/i);
assert.match(offer, /Customer footage is not reused as public proof without separate permission/i);
assert.doesNotMatch(offer, /viral|ROAS|conversion rate|guaranteed/i);

assert.match(portfolio, /href="brand-film\/">See the USD 500 assembly pilot/);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/video\/brand-film\/<\/loc>/);

console.log("AI Clip Assembly offer contract passed");
