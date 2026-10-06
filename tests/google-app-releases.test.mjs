import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = p => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const release = JSON.parse(read('docs/google-app-releases-20261007.json'));
const catalog = JSON.parse(read('products/catalog.json'));
const home = read('index.html');
const directory = read('products/index.html');
test('nine verified Android releases have exact links, icons and crawlable entries', () => {
  assert.equal(release.apps.length, 9);
  assert.equal(new Set(release.apps.map(a => a.package)).size, 9);
  for (const app of release.apps) {
    assert.equal(app.url, `https://play.google.com/store/apps/details?id=${app.package}`);
    assert.equal(app.price, '0.99');
    assert.ok(fs.existsSync(new URL('../logos/apps/' + app.icon, import.meta.url)));
    const card = home.match(new RegExp(`<article[^>]+data-app="${app.id}"[\\s\\S]*?<\\/article>`))[0];
    const entry = directory.match(new RegExp(`<article id="${app.id}"[\\s\\S]*?<\\/article>`))[0];
    for (const fragment of [card, entry]) {
      assert.ok(fragment.includes(`href="${app.url}"`));
      assert.ok(fragment.includes(app.icon));
      assert.doesNotMatch(fragment, /apps\.apple\.com|testflight|internaltest|credit wallet|200 credits|certified accuracy/i);
    }
    const item = catalog.items.find(item => item.id === app.id);
    assert.equal(item.storeLinks.length, 1);
    assert.equal(item.storeLinks[0].url, app.url);
  }
});
test('invited Studio access remains explicit and all homepage copy is localized', () => {
  const context = {window: {}};
  vm.runInNewContext(read('app-release-translations.js'), context);
  const dictionaries = context.window.appReleaseTranslations;
  assert.equal(Object.keys(dictionaries).length, 13);
  for (const [locale, dictionary] of Object.entries(dictionaries)) {
    assert.ok(dictionary.app_clearpair_desc?.length > 15, locale);
    assert.ok(dictionary.app_lazyedit_desc?.length > 15, locale);
  }
  assert.match(dictionaries.en.app_lazyedit_desc, /Invitation and internet required/);
  assert.match(home, /<script src="app-release-translations.js"><\/script>/);
  assert.match(home, /releaseDict\[key\]/);
  const item = catalog.items.find(item => item.id === 'lazyedit');
  assert.match(item.description, /invitation and internet connection are required/);
  assert.match(item.description, /separate operator-enabled integration/);
  assert.ok(!release.apps.some(app => app.package === 'art.lazying.clearpair.clearpair'));
});
