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
const bunko = catalog.items.find(item => item.id === 'bunko');
assert.equal(bunko.url, 'https://lachlan.lazying.art/Bunko/');
assert.deepEqual(bunko.storeLinks, [
  {store: 'app-store', url: 'https://apps.apple.com/us/app/bunko-classics-with-ruby/id6815137919', device: 'iPhone · iPad'}
]);
const bunkoCard = html.match(/<article id="bunko"[^>]*>([\s\S]*?)<\/article>/)[1];
assert.match(bunkoCard, /href="https:\/\/lachlan\.lazying\.art\/Bunko\/"/, 'keep the web reader entry');
assert.match(bunkoCard, /href="https:\/\/apps\.apple\.com\/us\/app\/bunko-classics-with-ruby\/id6815137919"/);
assert.match(bunkoCard, /<small>iPhone · iPad<\/small>/);
assert.equal(catalog.items.find(item => item.id === 'lazyoracle').url, 'https://oracle.lazying.art/');
assert.equal(catalog.items.find(item => item.id === 'auspice').kind, 'Native app preview');
const landn = catalog.items.find(item => item.id === 'landn');
assert.deepEqual(landn.storeLinks, [
  {store: 'app-store', url: 'https://apps.apple.com/app/l-n-speech-practice/id6808872450'},
  {store: 'google-play', url: 'https://play.google.com/store/apps/details?id=art.lazying.landn'}
]);
const landnCard = html.match(/<article id="landn"[^>]*>([\s\S]*?)<\/article>/)[1];
assert.match(landnCard, /href="https:\/\/l-and-n\.lazying\.art\/"/, 'keep the free web entry');
assert.equal((landnCard.match(/class="store-button"/g) || []).length, 2);
assert.match(landnCard, /role="group" aria-label="L &amp; N speech practice app downloads"/);
for (const link of landn.storeLinks) {
  assert.ok(landnCard.includes(`data-store="${link.store}" href="${link.url}"`));
}
assert.match(landnCard, /aria-label="L &amp; N speech practice on the App Store"/);
assert.match(landnCard, /aria-label="L &amp; N speech practice on the Google Play"/);
assert.match(landnCard, /<strong>App Store<\/strong>/);
assert.match(landnCard, /<strong>Google Play<\/strong>/);
assert.doesNotMatch(landnCard, /internaltest|testflight|\.apk|art\.lazying\.landn\.pro/);
assert.doesNotMatch(discovery, /apps\.apple\.com|play\.google\.com/, 'store listings are not owned sitemap URLs');
assert.equal((html.match(/class="store-button"/g) || []).length, 3, 'only public app listings get store links');
const styles = read('products/styles.css');
assert.match(styles, /\.store-links\s*\{[^}]*flex-wrap:\s*wrap/);
assert.match(styles, /\.work-grid \.store-button\s*\{[^}]*min-height:\s*60px/);
assert.match(styles, /\.work-grid \.store-button:focus-visible/);
assert.doesNotMatch(discovery, /oracle-fast\.lazying\.art|bunko\.lazying\.art|aimemo-backend\./, 'mirrors, TLS-failing aliases and backends are not discovery targets');
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
