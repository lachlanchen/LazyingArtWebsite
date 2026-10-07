import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const panel = html.match(/<section class="babel" id="babelglass"[\s\S]*?<\/section>/)[0];
test('GlassAgent navigation opens the LightMind website in a new tab', () => {
  const nav = html.match(/<div class="nav-links" id="navLinks">([\s\S]*?)<\/div>/)[1];
  assert.match(nav, /href="https:\/\/lightmind\.art\/" target="_blank" rel="noopener noreferrer">GlassAgent /);
});
test('GlassAgent retains its visual but offers the released LightMind app', () => {
  assert.match(panel, /<h3[^>]*>GlassAgent<\/h3>/);
  assert.match(panel, /src="\/logos\/apps\/lightmind\.jpg"/);
  assert.match(panel, /id="glassagent-app-title">LightMind Agent<\/h2>/);
  assert.match(panel, /LightMind Tech Limited/);
  assert.equal([...panel.matchAll(/class="lang-tag"/g)].length, 11);
  assert.match(html, /\.babel-visual \.product-preview \{ height: auto;/);
  assert.match(html, /\.babel-visual \.lang-tag \{ opacity: 1;/);
  assert.doesNotMatch(panel, /prototype|coming soon|Register Interest|on-lens|magnetic|href="#features"|IdeasGlass/i);
  const links = [...panel.matchAll(/<a [^>]*href="([^"]+)"[^>]*>/g)];
  assert.deepEqual(links.map(m => m[1]), [
    'https://apps.apple.com/us/app/lightmind-agent/id6794785684',
    'https://play.google.com/store/apps/details?id=art.lightmind.mobile',
    'https://lightmind.art/',
  ]);
  for (const [tag] of links) {
    assert.match(tag, /target="_blank"/);
    assert.match(tag, /rel="noopener noreferrer"/);
  }
});
test('all locales use the existing qualified app copy rather than prototype promises', () => {
  const match = html.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/);
  const translations = vm.runInNewContext(`(${match[1]})`);
  assert.equal(Object.keys(translations).length, 13);
  assert.deepEqual([...panel.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]), ['app_lightmind_desc']);
  for (const dict of Object.values(translations)) assert.ok(dict.app_lightmind_desc?.trim());
});
