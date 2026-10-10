import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const home = read('index.html');
const products = read('products/index.html');
const catalog = JSON.parse(read('products/catalog.json'));
const routes = {
  westory: 'https://westory.onlyideas.art/',
  'lazyingart-coin': 'https://coin.lazying.art/'
};

test('web-only apps are in both app collections with one honest browser action', () => {
  for (const [id, url] of Object.entries(routes)) {
    const item = catalog.items.find(item => item.id === id);
    assert.equal(item.url, url);
    assert.equal(item.webApp, url);
    assert.equal(item.storeLinks, undefined);
    assert.equal(item.repository, undefined, 'No private source or unrelated parent repository');
    const homeCard = home.match(new RegExp(`<article class="app-download-card" data-app="${id}"[\\s\\S]*?<\\/article>`))?.[0];
    const productCard = products.match(new RegExp(`<article id="${id}"[\\s\\S]*?<\\/article>`))?.[0];
    for (const card of [homeCard, productCard]) {
      assert.ok(card, id);
      assert.match(card, new RegExp(`src="(?:/|../)logos/apps/${id}\\.png"`));
      assert.equal((card.match(/data-web-app/g) || []).length, 1);
      assert.ok(card.includes(`href="${url}"`));
      assert.doesNotMatch(card, /apps\.apple\.com|play\.google\.com|TestFlight|\.apk|airdrop|earn rewards/i);
    }
    assert.match(productCard, /data-app>/, 'The Apps filter includes web-only releases');
    assert.ok(home.includes(`href="#${id}-download-title"`), 'Discoverable in top app shelf');
    assert.ok(read('discovery-sitemap.xml').includes(`<loc>${url}</loc>`));
  }
});

test('web-only availability and concise descriptions cover all homepage languages', () => {
  const context = {window: {}};
  vm.runInNewContext(read('app-release-translations.js'), context);
  const translations = context.window.appReleaseTranslations;
  assert.equal(Object.keys(translations).length, 13);
  for (const [locale, dictionary] of Object.entries(translations)) {
    for (const key of ['web_beta_label', 'app_westory_desc', 'app_lazyingart_coin_desc']) {
      assert.ok(dictionary[key]?.trim(), `${locale}.${key}`);
    }
  }
  assert.match(catalog.items.find(item => item.id === 'westory').kind, /Web beta/);
  assert.match(translations.en.app_westory_desc, /adults.*room invitations.*permissions/);
});

test('Auspice is absent from visible collection, catalogue, structured data and sitemap', () => {
  for (const source of [home, products, JSON.stringify(catalog), read('discovery-sitemap.xml')]) {
    assert.doesNotMatch(source, /auspice/i);
  }
  assert.ok(catalog.items.some(item => item.id === 'lazyoracle'), 'LazyOracle is a separate retained app');
});
