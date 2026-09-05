import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "work", "index.html"), "utf8");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");

assert.match(html, /<link rel="canonical" href="https:\/\/lazying\.art\/work\/">/);
assert.match(html, /Start with the problem\./);
assert.match(html, /not a catalogue of every experiment/i);

for (const section of ["knowledge", "media", "research", "agents", "services"]) {
  assert.match(html, new RegExp(`id="${section}"`));
}

for (const project of [
  "LocalKnowledgeTerminal",
  "PocketPolyglot",
  "leonardsusskind",
  "Video2Book",
  "LazyEdit",
  "paper-revision-skill",
  "PaperAgent",
  "LazyPromotion/tree/main/examples/auditable-policy-coding",
  "LazySkills",
  "AgInTi-LabCanvas",
  "OpenHI",
]) {
  assert.match(html, new RegExp(`https://github\\.com/lachlanchen/${project}`));
}

assert.match(html, /fixed-scope USD 250 sprint/);
assert.match(html, /Auditable content coding/);
assert.match(
  html,
  /\.\.\/lkt\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=local_knowledge_terminal_pilot&amp;utm_content=work_services/,
);
assert.match(
  html,
  /\.\.\/lecture-pack\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=bilingual_lecture_pack_pilot&amp;utm_content=work_services/,
);
assert.match(
  html,
  /\.\.\/manuscript-sprint\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=manuscript_sprint_pilot&amp;utm_content=work_services/,
);
assert.doesNotMatch(html, /paid customer|customer result|client result|revenue|guaranteed/i);
assert.match(html, /https:\/\/github\.com\/sponsors\/lachlanchen/);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/work\/<\/loc>/);

console.log("Work shelf contract passed");
