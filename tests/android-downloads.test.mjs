import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {root, downloads} from '../tools/android-downloads.mjs';

const read = file => fs.readFileSync(new URL(file, root), 'utf8');
test('every advertised APK has one exact package, signed-file fingerprint and complete download', () => {
  assert.equal(downloads.apps.length, 23);
  for (const app of downloads.apps) {
    assert.doesNotMatch(app.filename, /debug|unsigned|base-master|split/i);
    if (app.url.startsWith('https://lazying.art/')) {
      const file = fs.readFileSync(new URL('downloads/'+app.filename, root));
      assert.equal(file.byteLength, app.bytes, app.id);
      assert.equal(crypto.createHash('sha256').update(file).digest('hex'), app.sha256, app.id);
      assert.equal(file.subarray(0, 2).toString(), 'PK');
    } else {
      assert.ok(app.bytes >= 100000000, 'large packages are release assets, not website Git blobs');
    }
  }
});
test('all products expose the matching download without replacing their store links', () => {
  const productHtml = read('products/index.html');
  const home = read('index.html');
  for (const app of downloads.apps) {
    const card = productHtml.match(new RegExp(`<article id="${app.productId}"[^>]*>[\\s\\S]*?<\\/article>`))?.[0];
    assert.ok(card?.includes(`data-apk-download="${app.id}"`), app.id);
    assert.ok(card.includes(`href="${app.url}"`), app.id);
    if (app.id !== 'games') assert.ok(home.includes(`data-apk-download="${app.id}"`), app.id);
  }
  for (const html of [home, productHtml]) {
    assert.match(html, /href="\/downloads\/"/);
    for (const [, id, href, filename] of html.matchAll(/data-apk-download="([^"]+)" href="([^"]+)" download="([^"]+)"/g)) {
      const app = downloads.apps.find(app => app.id === id);
      assert.equal(href, app?.url);
      assert.equal(filename, app?.filename);
    }
  }
});
test('download page remains useful without JavaScript and does not prefetch APKs', () => {
  const html = read('downloads/index.html');
  assert.equal((html.match(/data-download-card/g) || []).length, downloads.apps.length);
  assert.equal((html.match(/data-apk-download=/g) || []).length, downloads.apps.length);
  assert.match(html, /different signing certificate/);
  assert.match(html, /keep your existing app and data/);
  assert.doesNotMatch(html, /<iframe|<object|rel="(?:prefetch|preload)"/);
  assert.doesNotMatch(read('downloads/downloads.js'), /fetch\(|XMLHttpRequest|\.apk/);
  for (const app of downloads.apps) {
    assert.ok(html.includes(app.sha256));
    assert.ok(html.includes(`Build ${app.build}`));
  }
});
test('download labels are available in all thirteen homepage languages', () => {
  const window = {};
  vm.runInNewContext(read('app-release-translations.js'), {window});
  assert.equal(Object.keys(window.appReleaseTranslations).length, 13);
  for (const dict of Object.values(window.appReleaseTranslations)) {
    for (const key of ['android_downloads_label','android_apk_label','android_pro_apk_label']) assert.ok(dict[key]?.trim());
  }
});
