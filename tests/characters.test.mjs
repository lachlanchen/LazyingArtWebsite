import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const html = read('index.html');
const panel = html.match(/<section class="character-section"[\s\S]*?<\/section>/)?.[0];
const script = read('characters.js');

test('character panel follows products and uses only first-party existing artwork', () => {
  assert.ok(panel);
  assert.ok(html.indexOf('id="characters"') > html.indexOf('id="product"'));
  assert.ok(html.indexOf('id="characters"') < html.indexOf('<!-- Hero Section -->'));
  assert.equal((panel.match(/data-ip-gif=/g) || []).length, 4);
  assert.equal((panel.match(/\/banner\.jpg/g) || []).length, 2);
  assert.equal((panel.match(/href="https:\/\/aya\.lazying\.art\//g) || []).length, 7);
  const links = [...panel.matchAll(/<a\b[^>]+>/g)].map(match => match[0]);
  assert.equal(links.length, 8, 'Seven AYA links and the existing LINE creator store');
  for (const link of links) assert.match(link, /target="_blank" rel="noopener noreferrer"/);
  for (const asset of panel.matchAll(/(?:src|data-ip-gif)="([^"]+)"/g)) {
    assert.ok(asset[1].startsWith('https://aya.lazying.art/media/'));
  }
  assert.doesNotMatch(panel, /checkout|stripe|testflight|play\.google|apps\.apple/i);
  assert.match(panel, /aria-labelledby="character-title"/);
  assert.match(panel, /data-ip-motion[^>]*hidden/);
});

test('character introduction and motion controls cover every website locale', () => {
  const object = script.match(/const copy = (\{[\s\S]*?\n  \});/)[1];
  const copy = vm.runInNewContext('(' + object + ')');
  assert.deepEqual(Object.keys(copy).sort(), ['en','ja','zh-Hans','zh-Hant','ko','ar','vi','fr','es','pt','de','ru','tr'].sort());
  for (const values of Object.values(copy)) {
    assert.equal(values.length, 9);
    assert.ok(values.every(value => typeof value === 'string' && value.trim()));
  }
});

test('shop actions have decorative icons and responsive touch-friendly spacing', () => {
  const actions = panel.match(/<div class="character-actions">[\s\S]*?<\/div>/)?.[0];
  assert.ok(actions);
  assert.equal((actions.match(/class="character-cta"/g) || []).length, 2);
  assert.equal((actions.match(/<svg class="character-cta-icon"[^>]*aria-hidden="true" focusable="false"/g) || []).length, 2);
  assert.match(actions, /class="character-cta-label" data-ip-label="shop"/);
  const css = read('characters.css');
  assert.match(css, /\.character-actions\s*\{[^}]*display: flex;[^}]*flex-wrap: wrap;[^}]*gap: \.75rem;/);
  assert.match(css, /\.character-cta\s*\{[^}]*min-height: 48px;/);
  assert.match(css, /@media \(max-width: 480px\)[\s\S]*?\.character-actions\s*\{[^}]*flex-direction: column;/);
  assert.match(css, /\.character-cta-label\s*\{[^}]*overflow-wrap: anywhere;/);
});

test('GIFs keep still fallbacks, respect reduced motion and stop offscreen', () => {
  assert.equal((panel.match(/src="[^"]+\.png"/g) || []).length, 4);
  assert.match(script, /prefers-reduced-motion: reduce/);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /item\.visible && !paused && !document\.hidden && !item\.failed/);
  assert.match(script, /visibilitychange/);
  assert.match(script, /item\.image\.src = item\.poster/);
  assert.match(read('characters.css'), /prefers-reduced-motion: reduce/);
});
