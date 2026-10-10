import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {openPageLinksInNewTabs} from '../tools/page-link-policy.mjs';

const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const home = read('index.html');
const products = read('products/index.html');
const apps = JSON.parse(read('products/catalog.json')).items.filter(item => item.webApp);
test('every reviewed web app has a static button on the homepage and product card', () => {
  assert.equal(apps.length, 19);
  for (const item of apps) {
    const id = ({'shigame':'shi','lazyoracle':'oracle','musia-app':'musia'})[item.id] || item.id;
    const homeCard = item.id === 'echomind'
      ? home.match(/<aside class="beta-launch-card"[\s\S]*?<\/aside>/)[0]
      : home.match(new RegExp(`<article class="app-download-card" data-app="${id}"[\\s\\S]*?<\\/article>`))[0];
    const productCard = products.match(new RegExp(`<article id="${item.id}"[\\s\\S]*?<\\/article>`))[0];
    for (const card of [homeCard, productCard]) {
      const webLinks = [...card.matchAll(/<a\b[^>]*>/g)].filter(m => /\bdata-web-app\b/.test(m[0]));
      assert.equal(webLinks.length, 1, item.id);
      assert.ok(webLinks[0][0].includes(`href="${item.webApp}"`));
      assert.match(webLinks[0][0], /target="_blank" rel="noopener noreferrer"/);
    }
    assert.ok(item.webApp.startsWith('https://'));
    assert.ok(!/backend|\/admin/.test(item.webApp));
    if (item.id === 'lazyedit') {
      assert.equal(item.webApp, 'https://edit.lazying.art/login');
      assert.match(item.description, /invitation and internet connection are required/);
    } else {
      assert.notEqual(new URL(item.webApp).hostname, 'edit.lazying.art');
    }
    if (item.id.startsWith('clearpair-') || item.id === 'shigame') {
      assert.equal(item.webPreview, true);
      assert.ok(homeCard.includes('Web preview'));
      assert.ok(productCard.includes('Web preview'));
    }
  }
  const translations = vm.runInNewContext('(' + home.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/)[1] + ')');
  for (const dict of Object.values(translations)) {
    assert.ok(dict.web_app_label?.trim());
    assert.ok(dict.web_preview_label?.trim());
  }
});
test('page links open safely in new tabs while anchors and contact actions stay local', () => {
  for (const html of [home, products]) {
    assert.equal(openPageLinksInNewTabs(html), html, 'Generated and handwritten pages use the same policy');
    for (const [tag, href] of html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/g)) {
      if (href.startsWith('#')) assert.ok(!tag.includes('target="_blank"'));
      else if (/^(https?:|\/|[a-z][\w-]*\/)/i.test(href)) {
        assert.match(tag, /target="_blank"/);
        assert.match(tag, /rel="[^\"]*noopener/);
        assert.match(tag, /rel="[^\"]*noreferrer/);
      }
    }
  }
});
test('link policy preserves downloads, anchors, contact links and script strings', () => {
  const keep = '<a href="#apps">Apps</a><a href="mailto:contact@example.com">Email</a><a href="tel:123">Call</a><a href="book.pdf" download>Download</a><script>const sample = \'<a href="/example/">\';</script>';
  assert.equal(openPageLinksInNewTabs(keep), keep);
  const link = openPageLinksInNewTabs('<a href="products/" rel="nofollow">Products</a>');
  assert.equal(link, '<a href="products/" target="_blank" rel="nofollow noopener noreferrer">Products</a>');
  assert.equal(openPageLinksInNewTabs(link), link);
});
