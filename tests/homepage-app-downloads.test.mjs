import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const cards = [...html.matchAll(/<article class="app-download-card"[^>]*>([\s\S]*?)<\/article>/g)].map(m => m[1]);
assert.equal(cards.length, 20);
assert.ok(html.indexOf('id="app-downloads"') < html.indexOf('<aside class="beta-launch-card"'));
// Web destinations have their own contract; native store identities stay exact.
const links = card => [...card.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)].filter(m => !m[0].includes('data-web-app')).map(m => m[1]);
assert.deepEqual(links(cards[0]), [
  'https://apps.apple.com/us/app/l-n-speech-practice/id6808872450',
  'https://apps.apple.com/us/app/l-n-speech-practice/id6808872450?platform=mac',
  'https://play.google.com/store/apps/details?id=art.lazying.landn',
  'https://play.google.com/store/apps/details?id=art.lazying.landn.pro',
]);
assert.deepEqual(links(cards[1]), [
  'https://apps.apple.com/us/app/bunko-classics-with-ruby/id6815137919',
  'https://apps.apple.com/us/app/bunko-classics-with-ruby/id6815137919?platform=mac',
  'https://play.google.com/store/apps/details?id=art.lazying.bunko',
]);
assert.deepEqual(links(cards[2]), [
  'https://onlyideas.art/',
  'https://apps.apple.com/us/app/onlyideas/id6816392935?platform=iphone',
  'https://apps.apple.com/us/app/onlyideas/id6816392935?platform=mac',
  'https://play.google.com/store/apps/details?id=art.onlyideas.app',
]);
assert.deepEqual(links(cards[3]), [
  'products/#aimemo',
  'https://apps.apple.com/us/app/aimemo-ai-notes-voice/id6757573920',
  'https://play.google.com/store/apps/details?id=art.lazying.aimemo',
]);
assert.deepEqual(links(cards[4]), [
  'https://apps.apple.com/us/app/shi-the-shape-of-power/id6816377548',
  'https://play.google.com/store/apps/details?id=art.lazying.shi',
]);
assert.deepEqual(links(cards[5]), ['https://play.google.com/store/apps/details?id=art.lazying.lazyoracle']);
assert.deepEqual(links(cards[6]), [
  'https://apps.apple.com/us/app/lightmind-agent/id6794785684',
  'https://play.google.com/store/apps/details?id=art.lightmind.mobile',
]);
assert.deepEqual(links(cards[7]), ['https://play.google.com/store/apps/details?id=art.lazying.musia']);
assert.match(cards[7], /US\$2\.99/);
assert.match(cards[7], /iPhone and Mac editions are awaiting review/);
assert.doesNotMatch(cards[7], /apps\.apple\.com|cloud music generation|microphone|AI-generated songs/i);
assert.doesNotMatch(cards.join(''), /testflight|internaltest|\.apk|accurate|guarantee|free|localhost|127\.0\.0\.1/i);
assert.match(cards[6], /LightMind Tech Limited/);
for (const card of cards) {
  const id = card.match(/<h2 id="([^"]+)"/)[1];
  assert.ok(card.includes(`role="group" aria-labelledby="${id}"`));
}
const match = html.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/);
assert.ok(match);
const translations = vm.runInNewContext(`(${match[1]})`);
assert.equal(Object.keys(translations).length, 13);
for (const [locale, dictionary] of Object.entries(translations)) {
  for (const key of ['app_landn_desc', 'app_bunko_desc', 'app_onlyideas_desc', 'app_aimemo_desc', 'app_shi_desc', 'app_oracle_desc', 'app_lightmind_desc', 'app_musia_desc', 'app_musia_apple']) {
    assert.ok(dictionary[key]?.trim(), `${locale}.${key} is localized`);
  }
}
assert.match(translations.en.app_onlyideas_desc, /iPhone, iPad, Mac and Android/);
for (const [locale, dictionary] of Object.entries(translations)) {
  assert.match(dictionary.app_bunko_desc, /Apple Watch/, `${locale}: shipped Watch reading is localized`);
}
assert.match(cards[1], /aligned passage on Apple Watch/);
assert.match(html, /\.app-download-links\s*\{[^}]*flex-wrap:\s*wrap/);
assert.match(html, /\.app-download-links a\s*\{[^}]*min-height:\s*44px/);
assert.match(html, /\.app-download-links a:focus-visible/);
console.log('Homepage app downloads, exact store routes and 13 locales passed');
