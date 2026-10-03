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
assert.ok(html.includes('href="https://platform.lazying.art/">Apps &amp; shop</a>'));
assert.ok(discovery.includes('<loc>https://platform.lazying.art/</loc>'));
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
  {store: 'app-store', url: 'https://apps.apple.com/us/app/bunko-classics-with-ruby/id6815137919', device: 'iPhone · iPad · Watch'},
  {store: 'mac-app-store', url: 'https://apps.apple.com/us/app/bunko-classics-with-ruby/id6815137919?platform=mac', device: 'Mac'},
  {store: 'google-play', url: 'https://play.google.com/store/apps/details?id=art.lazying.bunko', device: 'Android'}
]);
const bunkoCard = html.match(/<article id="bunko"[^>]*>([\s\S]*?)<\/article>/)[1];
assert.match(bunkoCard, /href="https:\/\/lachlan\.lazying\.art\/Bunko\/"/, 'keep the web reader entry');
assert.match(bunkoCard, /href="https:\/\/apps\.apple\.com\/us\/app\/bunko-classics-with-ruby\/id6815137919"/);
assert.match(bunkoCard, /<small>iPhone · iPad · Watch<\/small>/);
assert.match(bunkoCard, /<strong>Mac App Store<\/strong>/);
assert.equal(catalog.items.find(item => item.id === 'lazyoracle').url, 'https://oracle.lazying.art/');
assert.equal(catalog.items.find(item => item.id === 'auspice').kind, 'Companion app preview');
const landn = catalog.items.find(item => item.id === 'landn');
assert.deepEqual(landn.storeLinks, [
  {store: 'app-store', url: 'https://apps.apple.com/app/l-n-speech-practice/id6808872450'},
  {store: 'google-play', url: 'https://play.google.com/store/apps/details?id=art.lazying.landn'},
  {store: 'google-play', edition: 'Pro', url: 'https://play.google.com/store/apps/details?id=art.lazying.landn.pro', device: 'Android · all pairs included'}
]);
const landnCard = html.match(/<article id="landn"[^>]*>([\s\S]*?)<\/article>/)[1];
assert.match(landnCard, /href="https:\/\/l-and-n\.lazying\.art\/"/, 'keep the free web entry');
assert.equal((landnCard.match(/class="store-button"/g) || []).length, 3);
assert.match(landnCard, /role="group" aria-label="L &amp; N speech practice app downloads"/);
for (const link of landn.storeLinks) {
  assert.ok(landnCard.includes(`data-store="${link.store}" href="${link.url}"`));
}
assert.match(landnCard, /aria-label="L &amp; N speech practice on the App Store"/);
assert.match(landnCard, /aria-label="L &amp; N speech practice on the Google Play"/);
assert.match(landnCard, /<strong>App Store<\/strong>/);
assert.match(landnCard, /<strong>Google Play<\/strong>/);
assert.match(landnCard, /<strong>Google Play Pro<\/strong>/);
assert.doesNotMatch(landnCard, /internaltest|testflight|\.apk/);
assert.doesNotMatch(discovery, /apps\.apple\.com|play\.google\.com/, 'store listings are not owned sitemap URLs');
assert.equal((html.match(/class="store-button"/g) || []).length, 17, 'only verified public app listings get store links');
for (const id of ['aimemo']) {
  const item = catalog.items.find(item => item.id === id);
  assert.equal(new URL(item.url).origin, 'https://blog.lazying.art', 'Index the useful public introduction, not a private account workspace');
  assert.equal(item.storeLinks.length, 2, 'AiMemo is now publicly listed on iOS and Android');
  assert.doesNotMatch(item.description + item.kind, /in review|web release is free/);
}
const onlyideas = catalog.items.find(item => item.id === 'onlyideas');
assert.equal(onlyideas.storeLinks.length, 2);
assert.equal(onlyideas.storeLinks[0].url, 'https://apps.apple.com/us/app/onlyideas/id6816392935?platform=mac');
assert.equal(onlyideas.storeLinks[1].url, 'https://play.google.com/store/apps/details?id=art.onlyideas.app');
assert.match(onlyideas.description, /Mac and Android/);
assert.doesNotMatch(onlyideas.description, /Mac app is free|mobile editions are still in review/);
assert.ok(!onlyideas.storeLinks.some(link => link.store === 'app-store'), 'Mac approval does not imply iPhone approval');
const lightmind = catalog.items.find(item => item.id === 'lightmind-agent');
assert.match(lightmind.description, /LightMind Tech Limited/);
assert.equal(lightmind.storeLinks.length, 2);
assert.ok(!discovery.includes('lightmind.art'), 'separate brand is not included in the LazyingArt cross-site sitemap');
for (const id of ['shigame', 'lazyoracle']) assert.ok(catalog.items.find(item => item.id === id).storeLinks.length);
assert.equal(catalog.items.find(item => item.id === 'aimemo').repository, null, 'Private source stays private');
assert.match(catalog.items.find(item => item.id === 'echomind').description, /invitation-based/);
for (const id of ['bunko', 'landn', 'lazyedit', 'lazyoracle']) {
  const item = catalog.items.find(item => item.id === id);
  assert.equal(new URL(item.storyUrl).origin, 'https://blog.lazying.art');
  const card = html.match(new RegExp(`<article id="${id}"[^>]*>([\\s\\S]*?)<\\/article>`))[1];
  assert.ok(card.includes(`href="${item.storyUrl}">Read the story</a>`));
}
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
