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
test('GlassAgent leads with its original vision and a compact companion app below', () => {
  assert.match(panel, /<h3[^>]*>GlassAgent<\/h3>/);
  assert.match(panel, /src="\/logos\/apps\/lightmind\.jpg"/);
  assert.match(panel, /id="glassagent-title" data-i18n="glass_title">Wear It, Speak Any Language<\/h2>/);
  assert.match(panel, /id="glassagent-app-title">LightMind Agent<\/h3>/);
  assert.match(panel, /class="glassagent-app-header"[\s\S]*?<img[^>]*width="64" height="64"[\s\S]*?<div>[\s\S]*?<h3/);
  assert.match(html, /\.glassagent-app-header \{ display: flex;/);
  assert.ok(panel.indexOf('glassagent-title') < panel.indexOf('class="glassagent-companion"'));
  assert.match(panel, /data-i18n="glass_vision_tag">THE GLASSAGENT VISION/);
  assert.match(panel, /The app is an early step toward this vision\./);
  assert.equal([...panel.matchAll(/<li data-i18n="glass_b[1-5]"/g)].length, 5);
  assert.match(panel, /LightMind Tech Limited/);
  assert.equal([...panel.matchAll(/class="lang-tag"/g)].length, 11);
  assert.match(html, /\.babel-visual \.product-preview \{ height: auto;/);
  assert.match(html, /\.babel-visual \.lang-tag \{ opacity: 1;/);
  assert.doesNotMatch(panel, /prototype-placeholder|coming soon|Register Interest|href="#features"|IdeasGlass/i);
  assert.match(panel, /aria-describedby="glassagent-app-note"/);
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
test('all locales separate the GlassAgent vision from the current companion app', () => {
  const match = html.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/);
  const translations = vm.runInNewContext(`(${match[1]})`);
  assert.equal(Object.keys(translations).length, 13);
  const keys = ['glass_vision_tag', 'glass_title', 'glass_subtitle', 'glass_b1', 'glass_b2', 'glass_b3', 'glass_b4', 'glass_b5', 'app_lightmind_desc', 'glass_app_note'];
  assert.deepEqual([...panel.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]), keys);
  for (const dict of Object.values(translations)) {
    for (const key of keys) assert.ok(dict[key]?.trim(), key);
  }
  assert.equal(translations.en.glass_title, 'Wear It, Speak Any Language');
  assert.equal(translations['zh-Hans'].glass_title, '戴上即可说任何语言');
});
