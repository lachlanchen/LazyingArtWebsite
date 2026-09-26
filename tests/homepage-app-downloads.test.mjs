import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const cards = [...html.matchAll(/<article class="app-download-card"[^>]*>([\s\S]*?)<\/article>/g)].map(m => m[1]);
assert.equal(cards.length, 2);
assert.ok(html.indexOf('id="app-downloads"') < html.indexOf('<aside class="beta-launch-card"'));
const links = card => [...card.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
assert.deepEqual(links(cards[0]), [
  'https://apps.apple.com/us/app/l-n-speech-practice/id6808872450',
  'https://play.google.com/store/apps/details?id=art.lazying.landn',
]);
assert.deepEqual(links(cards[1]), [
  'https://apps.apple.com/us/app/bunko-classics-with-ruby/id6815137919',
]);
assert.doesNotMatch(cards.join(''), /testflight|internaltest|\.apk|Pro\b|accurate|guarantee|free|localhost|127\.0\.0\.1/i);
for (const card of cards) {
  const id = card.match(/<h2 id="([^"]+)"/)[1];
  assert.ok(card.includes(`role="group" aria-labelledby="${id}"`));
}
const match = html.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/);
assert.ok(match);
const translations = vm.runInNewContext(`(${match[1]})`);
assert.equal(Object.keys(translations).length, 13);
for (const [locale, dictionary] of Object.entries(translations)) {
  for (const key of ['app_landn_desc', 'app_bunko_desc']) {
    assert.ok(dictionary[key]?.trim(), `${locale}.${key} is localized`);
  }
}
assert.match(html, /\.app-download-links\s*\{[^}]*flex-wrap:\s*wrap/);
assert.match(html, /\.app-download-links a\s*\{[^}]*min-height:\s*44px/);
assert.match(html, /\.app-download-links a:focus-visible/);
console.log('Homepage app downloads, exact store routes and 13 locales passed');
