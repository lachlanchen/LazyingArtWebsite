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
  assert.equal((panel.match(/target="_blank" rel="noopener noreferrer"/g) || []).length, 7);
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

test('GIFs keep still fallbacks, respect reduced motion and stop offscreen', () => {
  assert.equal((panel.match(/src="[^"]+\.png"/g) || []).length, 4);
  assert.match(script, /prefers-reduced-motion: reduce/);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /item\.visible && !paused && !document\.hidden && !item\.failed/);
  assert.match(script, /visibilitychange/);
  assert.match(script, /item\.image\.src = item\.poster/);
  assert.match(read('characters.css'), /prefers-reduced-motion: reduce/);
});
