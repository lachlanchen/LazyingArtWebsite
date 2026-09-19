import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const html = fs.readFileSync(new URL("index.html", root), "utf8");
const head = html.split("</head>")[0];
assert.equal((head.match(/rel="canonical"/g) || []).length, 1);
assert.match(head, /<link rel="canonical" href="https:\/\/lazying\.art\/">/);
assert.match(head, /<meta property="og:url" content="https:\/\/lazying\.art\/">/);
assert.match(head, /<meta name="twitter:card" content="summary_large_image">/);
for (const attribute of ["og:image", "twitter:image"]) {
  const tag = head.match(new RegExp(`<meta (?:property|name)="${attribute}" content="([^"]+)">`));
  assert.ok(tag, `${attribute} exists`);
  const image = new URL(tag[1]);
  assert.equal(image.origin, "https://lazying.art");
  assert.ok(fs.existsSync(new URL(`.${image.pathname}`, root)), `${attribute} resolves to a real asset`);
}
assert.doesNotMatch(head, /name="robots"[^>]*noindex/);
const sitemap = fs.readFileSync(new URL("sitemap.xml", root), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(urls).size, urls.length, "no duplicate sitemap entries");
for (const url of urls) {
  const loc = new URL(url);
  assert.equal(loc.origin, "https://lazying.art", "this sitemap covers this site's pages only");
  const source = new URL(`.${loc.pathname}${loc.pathname.endsWith("/") ? "index.html" : ""}`, root);
  const page = fs.readFileSync(source, "utf8");
  assert.ok(page.includes(`<link rel="canonical" href="${url}">`), `${url}: explicit canonical matches sitemap`);
  assert.doesNotMatch(page, /<meta[^>]+name="robots"[^>]*noindex/, `${url}: sitemap excludes noindex pages`);
}
console.log("Homepage canonical and social asset checks passed");
