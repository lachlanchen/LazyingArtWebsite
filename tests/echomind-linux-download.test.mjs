import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
test('EchoMind links to the qualified Linux preview on home and product pages', () => {
  for (const route of ['index.html', 'products/index.html']) {
    assert.match(read(route), /href="\/downloads\/echomind-linux.html"[^>]*data-linux-download="echomind"|data-linux-download="echomind"[^>]*href="\/downloads\/echomind-linux.html"/);
  }
  const page = read('downloads/echomind-linux.html');
  assert.ok(page.includes('https://github.com/lachlanchen/LazyingArtWebsite/releases/download/echomind-linux-preview-1.0.1/EchoMind-1.0.1-preview.1-linux-x64.deb'));
  assert.match(page, /b233575e2582e40acdf5795051f8ec3220896551222aad1fb2da0a636c72fb45/);
  assert.match(page, /Ubuntu 24\.04 LTS, x64/);
  assert.match(page, /does not save your password or login session/);
});
