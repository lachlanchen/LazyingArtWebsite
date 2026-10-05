import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { strings, canAutoplay } = require('../app-carousel.js');
const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const source = readFileSync(new URL('app-carousel.js', root), 'utf8');

test('autoplay needs visible, overflowing cards and pauses for every interaction or hidden page', () => {
  const state = { enabled:true, visible:true, hidden:false, hovered:false, focused:false, dragging:false, busy:false, overflow:true };
  assert.equal(canAutoplay(state), true);
  for (const key of ['enabled','visible','overflow']) assert.equal(canAutoplay({ ...state, [key]:false }), false);
  for (const key of ['hidden','hovered','focused','dragging','busy']) assert.equal(canAutoplay({ ...state, [key]:true }), false);
});

test('carousel controls and accessibility names are localized in all 13 website languages', () => {
  assert.equal(Object.keys(strings).length, 13);
  for (const [locale, dict] of Object.entries(strings)) {
    assert.deepEqual(Object.keys(dict), ['title','previous','next','on','off','cards','shortcuts']);
    for (const value of Object.values(dict)) assert.ok(value.trim(), locale);
    assert.notEqual(dict.on, dict.off);
  }
});

test('one real-card row keeps official artwork, safe anchors and existing purchase identities', () => {
  assert.match(html, /\.app-downloads\s*\{[^}]*display:\s*flex[^}]*flex-wrap:\s*nowrap[^}]*overflow-x:\s*auto/);
  assert.match(html, /data-app-reel data-reel-loop/);
  assert.match(html, /data-reel-auto aria-pressed="false"/);
  const cards = [...html.matchAll(/<article class="app-download-card"[^>]*>([\s\S]*?)<\/article>/g)].map(m=>m[1]);
  assert.equal(cards.length, 8);
  for (const card of cards) {
    const icon = card.match(/<img class="app-card-icon" src="([^"]+)"/)[1];
    assert.ok(existsSync(new URL(icon.slice(1), root)));
  }
  assert.match(html, /<aside class="beta-launch-card"[\s\S]*?class="app-card-icon"[^>]*echomind.png/);
  assert.doesNotMatch(source, /cloneNode|innerHTML|fetch\(|setInterval/);
  assert.match(source, /track\.append\(track\.firstElementChild\)/);
  assert.match(source, /prefers-reduced-motion:\s*reduce/);
  assert.match(source, /localStorage\.getItem\(storageKey\) === 'off'/);
  assert.match(html, /<script src="app-carousel.js" defer><\/script>/);
});
