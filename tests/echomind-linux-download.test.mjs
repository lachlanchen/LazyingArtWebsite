import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
test('EchoMind links to the qualified Linux preview on home and product pages', () => {
  for (const route of ['index.html', 'products/index.html']) {
    assert.match(read(route), /href="\/downloads\/echomind-linux.html"[^>]*data-linux-download="echomind"|data-linux-download="echomind"[^>]*href="\/downloads\/echomind-linux.html"/);
  }
  const page = read('downloads/echomind-linux.html');
  const meta = JSON.parse(read('downloads/ubuntu/releases.json')).apps.echomind;
  const filename = 'EchoMind-1.0.45-preview.1-2-linux-x64.deb';
  assert.equal(meta.download, 'https://github.com/lachlanchen/LazyingArtWebsite/releases/download/echomind-linux-preview-1.0.45/' + filename);
  assert.ok(page.includes('data-linux-package="echomind" href="' + meta.download + '"'));
  assert.ok(page.includes('sudo apt install ./' + filename));
  assert.equal(meta.sha256, '21df73506e2f54ad64673be10abe40f0da742603485612dee767e2240fc7e4d3');
  assert.ok(page.includes(meta.sha256) && page.includes(meta.bytes.toLocaleString('en-US') + ' bytes'));
  assert.match(page, /Ubuntu 24\.04 LTS, x64/);
  assert.match(page, /direct, unsigned preview download/);
  assert.match(page, /session stays in your browser/);
});
