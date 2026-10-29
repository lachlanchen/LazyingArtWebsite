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

test('web apps retain their browser action alongside qualified store releases', () => {
  for (const [id, url] of Object.entries(routes)) {
    const item = catalog.items.find(item => item.id === id);
    assert.equal(item.url, url);
    assert.equal(item.webApp, url);
    if (id === 'lazyingart-coin') {
      assert.deepEqual(item.storeLinks, [{store: 'app-store', url: 'https://apps.apple.com/app/lazyartcoin/id6816384930', device: 'iPhone · iPad'}, {store: 'google-play', url: 'https://play.google.com/store/apps/details?id=art.lazying.lazyartcoin', device: 'Android'}]);
    } else assert.equal(item.storeLinks, undefined);
    assert.equal(item.repository, undefined, 'No private source or unrelated parent repository');
    const homeCard = home.match(new RegExp(`<article class="app-download-card" data-app="${id}"[\\s\\S]*?<\\/article>`))?.[0];
    const productCard = products.match(new RegExp(`<article id="${id}"[\\s\\S]*?<\\/article>`))?.[0];
    for (const card of [homeCard, productCard]) {
      assert.ok(card, id);
      assert.match(card, new RegExp(`src="(?:/|../)logos/apps/${id}\\.png"`));
      assert.equal((card.match(/data-web-app/g) || []).length, 1);
      assert.ok(card.includes(`href="${url}"`));
      assert.doesNotMatch(card, /TestFlight|airdrop|earn rewards/i);
      if (id === 'lazyingart-coin') assert.match(card, /data-apk-download="lazyingart-coin"/);
      else assert.doesNotMatch(card, /\.apk|data-apk-download/);
      if (id === 'lazyingart-coin') {
        assert.equal((card.match(/href="https:\/\/apps\.apple\.com\/app\/lazyartcoin\/id6816384930"/g) || []).length, 1);
        assert.doesNotMatch(card, /Mac App Store|platform=mac/);
        assert.equal((card.match(/href="https:\/\/play\.google\.com\/store\/apps\/details\?id=art\.lazying\.lazyartcoin"/g) || []).length, 1);
      } else assert.doesNotMatch(card, /play\.google\.com|apps\.apple\.com/);
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

test('Coin web capabilities distinguish networks without upgrading public store claims', () => {
  const coin = catalog.items.find(item => item.id === 'lazyingart-coin');
  const network = catalog.items.find(item => item.id === 'lazyart-network');
  assert.match(coin.description, /The web app supports native LAC on LazyArt Network/);
  assert.match(coin.description, /existing LazyingArtCoin on Ethereum separately/);
  assert.match(coin.description, /LazyArtCoin on Ethereum/);
  assert.match(coin.description, /optional LazyingArt account login/);
  assert.match(coin.description, /App credits remain separate/);
  assert.equal(network.url, 'https://lac.lazying.art/');
  assert.equal(network.storeLinks, undefined);
  assert.match(network.description, /20261020/);
  assert.match(network.description, /Native LAC, Ethereum tokens and app points are separate/);
  assert.ok(read('discovery-sitemap.xml').includes('<loc>https://lac.lazying.art/</loc>'));
  for (const page of [home, products]) {
    assert.match(page, /href="https:\/\/lac\.lazying\.art\/"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
  }
  for (const item of [coin, network]) {
    assert.doesNotMatch(JSON.stringify(item), /airdrop|migration|bridge|guaranteed|new token/i);
  }
  const tokenURL = 'https://etherscan.io/token/0x59D29c62F41B10dD580Cc9D428C79E0D3d6685a4';
  assert.deepEqual(coin.referenceLinks, [{label: 'Ethereum · LazyArtCoin (2026)', url: tokenURL}]);
  assert.match(coin.description, /Cross-network transfers are not available/);
  for (const page of [home, products]) {
    assert.ok(page.includes(`href="${tokenURL}" target="_blank" rel="noopener noreferrer"`));
  }

  const context = {window: {}};
  vm.runInNewContext(read('app-release-translations.js'), context);
  const dictionaries = vm.runInNewContext('(' + home.match(
    /const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/
  )[1] + ')');
  assert.equal(Object.keys(dictionaries).length, 13);
  for (const [locale, dictionary] of Object.entries(dictionaries)) {
    assert.equal(dictionary.coin_title, 'LazyArtCoin', locale);
    assert.ok(dictionary.coin_card_cta_title.includes('LazyArtCoin'), locale);
    const description = context.window.appReleaseTranslations[locale].app_lazyingart_coin_desc;
    assert.ok(description.includes('LazyArt Network') && description.includes('LazyArtCoin') && description.includes('LazyingArtCoin'), locale);
  }
  assert.ok(home.includes(context.window.appReleaseTranslations.en.app_lazyingart_coin_desc));
});

test('Auspice is absent from visible collection, catalogue, structured data and sitemap', () => {
  for (const source of [home, products, JSON.stringify(catalog), read('discovery-sitemap.xml')]) {
    assert.doesNotMatch(source, /auspice/i);
  }
  assert.ok(catalog.items.some(item => item.id === 'lazyoracle'), 'LazyOracle is a separate retained app');
});
