import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');

test('top app launcher reuses the official app icons and existing download sections', () => {
  const shelf = html.match(/<nav class="app-shelf"[^>]*>([\s\S]*?)<\/nav>/)[1];
  const anchors = [...shelf.matchAll(/<a href="#([^"]+)"><img src="([^"]+)"[^>]*alt=""><span>([^<]+)<\/span><\/a>/g)];
  const released = JSON.parse(readFileSync(new URL('docs/google-app-releases-20261007.json', root), 'utf8')).apps;
  assert.deepEqual(anchors.map(m => m[1]), ['landn-download-title', 'bunko-download-title', 'onlyideas-download-title', 'aimemo-download-title', 'shi-download-title', 'oracle-download-title', 'musia-download-title', 'beta-launch-title', ...released.map(app => app.id + '-download-title'), 'microquant-title']);
  assert.deepEqual(anchors.slice(0,8).map(m => m[3]), ['L &amp; N', 'Bunko', 'OnlyIdeas', 'AiMemo', 'SHI', 'LazyOracle', 'Musia', 'EchoMind']);
  for (const [, anchor, src] of anchors) {
    assert.ok(html.includes(`id="${anchor}"`));
    assert.match(src, /^\/logos\/apps\/[a-z-]+\.(png|jpg|webp)(?:\?v=[a-z0-9-]+)?$/);
    assert.ok(existsSync(new URL(src.split('?')[0].slice(1), root)));
  }
  assert.ok(html.indexOf('<nav class="app-shelf"') < html.indexOf('id="app-downloads"'));
});

test('app launcher stays in one swipeable row without inheriting sticky navigation styles', () => {
  assert.match(html, /\.app-shelf\s*\{[^}]*flex-wrap:\s*nowrap[^}]*overflow-x:\s*auto/);
  assert.match(html, /\.app-shelf a\s*\{[^}]*flex:\s*0 0 112px[^}]*align-items:\s*center/);
  assert.match(html, /\.app-shelf a\s*\{[^}]*flex-basis:\s*88px/);
  assert.match(html, /\.app-shelf a:focus-visible/);
  assert.match(html, /#navbar\s*\{[^}]*position:\s*sticky/);
  assert.doesNotMatch(html, /(?:^|\n)\s*nav\s*\{/);
  assert.match(html, /id="app-shortcuts"[^>]*data-reel-track/);
});
