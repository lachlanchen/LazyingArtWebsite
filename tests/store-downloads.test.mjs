import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {appleQrPlans} from '../store-downloads.mjs';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(fs.readFileSync(new URL('media/store-qr/catalog.json', root)));
const first = Object.keys(manifest).find(u => /\/app\//.test(u) && !u.includes('?'));
test('QR follows an existing exact Apple URL, never an inferred platform', () => {
  assert.deepEqual(appleQrPlans([{href: first, label: 'App Store'}], manifest).map(x => x.href), [first]);
  assert.deepEqual(appleQrPlans([{href: 'https://play.google.com/store/apps/details?id=example.app'}], manifest), []);
  assert.deepEqual(appleQrPlans([{href: 'https://apps.apple.com/app/unknown/id123'}], manifest), []);
});
test('same universal app produces one QR per group; Mac-only destination stays exact', () => {
  const mac = Object.keys(manifest).find(u => /[?](?:platform=mac|mt=12)/.test(u));
  assert.equal(appleQrPlans([{href: mac}], manifest)[0].href, mac);
  assert.equal(appleQrPlans([{href: first}, {href: first}], manifest).length, 1);
});
test('unsafe hosts, schemes and asset paths cannot become QR images', () => {
  assert.deepEqual(appleQrPlans([{href: first.replace('apps.apple.com', 'apps.apple.com.evil.test')}], manifest), []);
  assert.deepEqual(appleQrPlans([{href: first.replace('https:', 'http:')}], manifest), []);
  assert.deepEqual(appleQrPlans([{href: first}], {[first]: {src: 'https://tracker.test/qr'}}), []);
});
test('all generated QR images exist locally and every supported page loads enhancement', () => {
  for (const asset of Object.values(manifest)) {
    assert.ok(fs.existsSync(new URL(asset.src.slice(1), root)));
    assert.equal(asset.width, asset.height);
    assert.ok(asset.width >= 250);
  }
  for (const page of ['index.html', 'products/index.html', 'downloads/index.html', 'work/index.html']) {
    assert.match(fs.readFileSync(new URL(page, root), 'utf8'), /type="module" src="\/store-downloads\.mjs\?v=20261031"/);
  }
});
