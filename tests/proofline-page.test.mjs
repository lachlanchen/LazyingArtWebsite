import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "proofline", "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "proofline", "styles.css"), "utf8");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const commit = "a062c7110d3c814b66ae9732f88eb891fe32b973";

assert.match(html, /<link rel="canonical" href="https:\/\/lazying\.art\/proofline\/">/);
assert.match(html, /No account\.<br>No upload\./);
assert.match(html, /Proofline PASS/);
assert.match(html, /Checked: 2 files, 2 claims, 1 transformation/);
assert.match(html, /cannot establish that a source is true/i);
assert.match(html, new RegExp(`LazyPromotion/blob/${commit}/proofline\\.py`));
assert.match(html, new RegExp(`LazyPromotion/tree/${commit}/examples/proofline`));
assert.doesNotMatch(html, /customer result|guaranteed|buy now|payment|stripe/i);
assert.match(css, /@media \(max-width: 820px\)/);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/proofline\/<\/loc>/);

console.log("Proofline page contract passed");
