import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "wenyan", "index.html"), "utf8");

assert.match(html, /<link rel="canonical" href="https:\/\/lazying\.art\/wenyan\/">/);
assert.match(html, /https:\/\/lachlanchen\.github\.io\/LinguaLeaf\/website\//);
assert.match(html, /https:\/\/github\.com\/lachlanchen\/PocketPolyglot/);
assert.match(html, /https:\/\/raw\.githubusercontent\.com\/lachlanchen\/LinguaLeaf\/main\/assets\/max-language-previews\/zizhi-tongjian-part-03\.png/);

for (const title of ["資治通鑑", "漢書", "後漢書", "三國志裴松之注", "春秋左氏傳"]) {
  assert.match(html, new RegExp(title));
}

assert.match(html, /資治通鑑 is available as six black-and-white parts/);
assert.match(html, /The other histories below have both color and black-and-white editions/);
assert.match(html, /Check each edition's source notes before redistributing it\./);
assert.doesNotMatch(html, /rights-cleared|openly licensed|public-domain editions/i);
assert.doesNotMatch(html, /\$\d+|USD \d+|buy now|checkout|payment/i);

console.log("wenyan reading shelf contract passed");
