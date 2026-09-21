import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';

const root = new URL('../', import.meta.url);
const read = name => fs.readFileSync(new URL(name, root), 'utf8');
const catalog = JSON.parse(read('products/catalog.json'));
const html = read('products/index.html');
const discovery = read('discovery-sitemap.xml');
const guides = JSON.parse(read('products/guides.json'));
assert.equal(guides.length, 6);
for (const guide of guides) {
  assert.equal(new URL(guide.url).origin, 'https://blog.lazying.art');
  assert.equal(new URL(guide.url).search, '');
  assert.ok(html.includes(`href="${guide.url}"`), 'guides are crawlable without JavaScript');
}
assert.ok(catalog.items.length >= 30, 'the directory must cover the wider public portfolio');
assert.equal(new Set(catalog.items.map(item => item.url)).size, catalog.items.length);
assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
assert.match(html, /<link rel="canonical" href="https:\/\/lazying\.art\/products\/">/);
assert.match(html, /application\/ld\+json/);
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema['@type'], 'CollectionPage');
assert.equal(schema.mainEntity.itemListElement.length, catalog.items.length);
assert.doesNotMatch(html, /"@type":"(?:Review|AggregateRating|Offer)"/);
assert.doesNotMatch(html, /<script(?! type="application\/ld\+json")/);
const forbidden = /(?:router\.lazying\.art|lazealoptix\.com|blogstudio\.|novelstudio\.|storystudio\.|text-and-speech-api|https:\/\/llm\.|https:\/\/memo\.|https:\/\/api\.|127\.0\.0\.1|ngrok|localhost|github\.io\/|github\.com\/lachlanchen\/(?:EchoMind|AiMemo|LocalSTT|OnlyIdeasWebsite|LazyingArtCoin)(?:["/]|$))/i;
assert.doesNotMatch(JSON.stringify(catalog), forbidden, 'public data excludes private, retired, and redirect-only destinations');
assert.doesNotMatch(html, forbidden);
assert.doesNotMatch(discovery, forbidden);
for(const [,loc] of discovery.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(loc);
  assert.ok(url.hostname === 'lazying.art' || url.hostname.endsWith('.lazying.art') || url.hostname === 'ideas.onlyideas.art');
  assert.ok(url.hostname !== 'game.lazying.art', 'submit the stable games introduction, not the redirecting app root');
}
assert.match(discovery, /https:\/\/l-and-n\.lazying\.art\//);
assert.match(discovery, /https:\/\/lachlan\.lazying\.art\/LazyTravel\//);
assert.match(discovery, /https:\/\/lazying\.art\/games\//);
for (const item of catalog.items) {
  assert.match(html, new RegExp(`id="${item.id}"`));
  assert.ok(html.includes(item.url.replaceAll('&','&amp;')));
  assert.equal(new URL(item.url).protocol, 'https:');
  assert.ok(!new URL(item.url).search, 'canonical catalogue links have no campaign or session parameters');
}
assert.match(catalog.items.find(item => item.id === 'games').description, /read|Watch/);
assert.match(catalog.items.find(item => item.id === 'games').description, /require an account/);
assert.match(read('sitemap.xml'), /<loc>https:\/\/lazying\.art\/products\/<\/loc>/);
assert.match(read('robots.txt'), /Sitemap: https:\/\/lazying\.art\/sitemap\.xml/);
const context={window:{}};vm.runInNewContext(read('service-translations.js'),context);
for(const [lang,dict] of Object.entries(context.window.serviceTranslations)) assert.ok(dict.nav_products,lang);
execFileSync(process.execPath,[new URL('tools/build-product-directory.mjs',root).pathname,'--check']);
console.log('Public directory, privacy exclusions, structured data, and generated output passed');
