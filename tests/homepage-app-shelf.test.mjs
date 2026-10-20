import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');

test('top app launcher reuses the official app icons and existing download sections', () => {
  const shelf = html.match(/<nav class="app-shelf"[^>]*>([\s\S]*?)<\/nav>/)[1];
  const anchors = [...shelf.matchAll(/<a href="#([^"]+)"><img src="([^"]+)"[^>]*alt=""><span>([^<]+)<\/span><\/a>/g)];
  assert.deepEqual(anchors.map(m => m[1]), [
    'beta-launch-title', 'aimemo-download-title', 'bunko-download-title', 'onlyideas-download-title',
    'lazyedit-download-title', 'musia-download-title', 'westory-download-title', 'weblog-download-title', 'landn-download-title', 'clearpair-download-title',
    ...['handf', 'landr', 'english', 'chinese', 'cantonese', 'japanese', 'korean', 'arabic'].map(id => `clearpair-${id}-download-title`),
    'oracle-download-title', 'shi-download-title', 'lazyingart-coin-download-title', 'microquant-title', 'lightmind-download-title'
  ]);
  assert.deepEqual(anchors.slice(0,9).map(m => m[3]), ['EchoMind', 'AiMemo', 'Bunko', 'OnlyIdeas', 'LazyEdit Studio', 'Musia', 'WeStory', 'WeBlog', 'L &amp; N']);
  for (const [, anchor, src] of anchors) {
    assert.ok(html.includes(`id="${anchor}"`));
    assert.match(src, /^\/logos\/apps\/[a-z-]+\.(png|jpg|webp)(?:\?v=[a-z0-9-]+)?$/);
    assert.ok(existsSync(new URL(src.split('?')[0].slice(1), root)));
  }
  assert.ok(html.indexOf('<nav class="app-shelf"') < html.indexOf('id="app-downloads"'));
  assert.equal([...shelf.matchAll(/<a href=/g)].length, 24);
  assert.deepEqual([...shelf.matchAll(/<span>([^<]+)<\/span>/g)].map(m=>m[1]).slice(6,10), ['WeStory','WeSticker','WeBlog','L &amp; N']);
  assert.match(shelf, /href="https:\/\/westicker\.lazying\.art\/" target="_blank" rel="noopener noreferrer"/);
});

test('product directory hero icon order is independent of unchanged product cards', () => {
  const directory = readFileSync(new URL('products/index.html', root), 'utf8');
  const board = directory.match(/<div class="icon-board">([\s\S]*?)<\/div>/)[1];
  assert.deepEqual([...board.matchAll(/href="#([^"]+)"/g)].map(m => m[1]),
    ['echomind', 'aimemo', 'bunko', 'onlyideas', 'lazyedit', 'musia-app', 'westory', 'westicker', 'weblog']);
  const cards = [...directory.matchAll(/<article id="([^"]+)" class="product-card app-card/g)].map(m => m[1]);
  assert.deepEqual(cards.slice(0, 6), ['onlyideas', 'bunko', 'landn', 'lazyedit', 'musia-app', 'aimemo']);
});

test('app launcher wraps every icon into visible rows without carousel controls', () => {
  assert.match(html, /\.app-shelf\s*\{[^}]*flex-wrap:\s*wrap[^}]*justify-content:\s*center/);
  assert.match(html, /\.app-shelf a\s*\{[^}]*flex:\s*0 0 120px[^}]*align-items:\s*center/);
  assert.match(html, /\.app-shelf a\s*\{[^}]*flex-basis:\s*88px/);
  assert.match(html, /\.app-shelf a:focus-visible/);
  assert.match(html, /#navbar\s*\{[^}]*position:\s*sticky/);
  assert.doesNotMatch(html, /(?:^|\n)\s*nav\s*\{/);
  assert.doesNotMatch(html, /id="app-shortcuts"[^>]*data-reel-track/);
  assert.doesNotMatch(html, /app-shortcut-controls|aria-controls="app-shortcuts"/);
  assert.doesNotMatch(html, /\.app-shelf\s*\{[^}]*overflow-x:\s*auto/);
});
