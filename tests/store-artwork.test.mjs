import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const root = new URL('../', import.meta.url);
const read = p => fs.readFileSync(new URL(p, root), 'utf8');
test('store links use the same local official artwork on every store-linked page', () => {
  for (const page of ['index.html', 'products/index.html', 'downloads/index.html', 'work/index.html']) {
    const version = page === 'work/index.html' ? '20261020' : '20261029-apk';
    assert.ok(read(page).includes(`href="/store-links.css?v=${version}"`), page);
  }
  const css = read('store-links.css');
  for (const host of ['apps.apple.com/', 'play.google.com/store/']) {
    assert.ok(css.includes(`a[href^="https://${host}"]::before`));
  }
  assert.doesNotMatch(css, /url\(["']?https?:|mask-image|filter:/);
  for (const [asset, hash] of [
    ['app-store.png', '76ea0b8723847daf4931d52ee993c447b324de108bdf2c989540e8d59bd22c70'],
    ['google-play.svg', 'b6206bae957dd424750ab909de7a21ee1623b6024c2d92ae5f621dcdfc5585c6']
  ]) {
    assert.equal(createHash('sha256').update(fs.readFileSync(new URL(`logos/stores/${asset}`, root))).digest('hex'), hash);
  }
  for (const [, body] of read('products/index.html').matchAll(/<a class="store-button"[^>]*>([\s\S]*?)<\/a>/g)) {
    assert.doesNotMatch(body, /<svg/);
    assert.match(body, /<strong>.+<\/strong><small>.+<\/small>/);
  }
});
