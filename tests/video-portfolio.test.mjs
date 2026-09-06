import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(join(root, "video", "index.html"), "utf8");

test("video portfolio has one canonical direct-view page", () => {
  assert.match(html, /<link rel="canonical" href="https:\/\/lazying\.art\/video\/">/);
  assert.equal((html.match(/<iframe /g) || []).length, 3);
  assert.equal((html.match(/<video /g) || []).length, 1);
  assert.match(html, /youtube-nocookie\.com\/embed\/qrzGXl5y-Ok/);
  assert.match(html, /youtube-nocookie\.com\/embed\/9FjVTAgD9QE/);
  assert.match(html, /youtube-nocookie\.com\/embed\/rVU37lPKPo8/);
  assert.match(html, /story-clip\/sample\/selected-provenance-clip\.mp4/);
});

test("video portfolio states roles and keeps claims bounded", () => {
  assert.equal((html.match(/<dt>Role<\/dt>/g) || []).length, 4);
  assert.equal((html.match(/<dt>Constraint<\/dt>/g) || []).length, 4);
  assert.match(html, /our own projects/);
  assert.doesNotMatch(html, /ROAS|conversion rate|customer result|client ad/i);
});
