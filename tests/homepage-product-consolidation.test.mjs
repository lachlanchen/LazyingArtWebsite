import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const html = read('index.html');

test('homepage uses the carousels instead of the duplicate product grid', () => {
  assert.doesNotMatch(html, /<[^>]+class="product-panels"|<[^>]+class="product-showcase/);
  for (const app of ['onlyideas', 'aimemo', 'lazyedit', 'microquant']) {
    assert.equal([...html.matchAll(new RegExp(`<article[^>]*data-app="${app}"`, 'g'))].length, 1);
  }
  assert.equal([...html.matchAll(/class="beta-launch-card"/g)].length, 1);
  assert.match(html, /class="hardware-heading"/);
  assert.match(html, /<figure class="carousel-slide is-active" id="lazyingart-robot">/);
  assert.match(html, /<figure class="carousel-slide" id="einkwordsgpt">/);
  assert.match(html, /revealHardware\(location.hash\)/);
  assert.match(html, /window.addEventListener\('hashchange'/);
});

test('MicroQuant is a research card with project links, not an invented store release', () => {
  const card = html.match(/<article class="app-download-card" data-app="microquant"[\s\S]*?<\/article>/)[0];
  assert.match(card, /Research tool/);
  assert.match(card, /href="https:\/\/quant.lazying.art\/"/);
  assert.match(card, /href="https:\/\/github.com\/lachlanchen\/MicroQuant"/);
  assert.doesNotMatch(card, /apps.apple.com|play.google.com|profit|returns|guarantee|buy|checkout/i);
  assert.match(html, /href="#microquant-title"><img src="\/logos\/apps\/microquant.png"/);
  assert.ok(fs.existsSync(new URL('../logos/apps/microquant.png', import.meta.url)));
  const context = { window:{} };
  vm.runInNewContext(read('app-release-translations.js'), context);
  const dictionaries = context.window.appReleaseTranslations;
  assert.equal(Object.keys(dictionaries).length, 13);
  for (const dictionary of Object.values(dictionaries)) {
    assert.ok(dictionary.app_microquant_kind.trim());
    assert.ok(dictionary.app_microquant_desc.trim());
  }
});

test('consolidated app cards place introduction links before bottom-aligned store buttons', () => {
  for (const [app, link] of [['onlyideas','https://onlyideas.art/'], ['aimemo','products/#aimemo'], ['lazyedit','products/#lazyedit']]) {
    const card = html.match(new RegExp(`<article class="app-download-card" data-app="${app}"[\\s\\S]*?<\\/article>`))[0];
    assert.ok(card.includes(`class="app-details-link" href="${link}"`));
    assert.match(card, /play.google.com/);
    assert.ok(card.indexOf('class="app-details-link"') < card.indexOf('class="app-download-links"'));
  }
  const echo = html.match(/<aside class="beta-launch-card"[\s\S]*?<\/aside>/)[0];
  assert.match(echo, /class="app-details-link" href="products\/#echomind"/);
  assert.match(echo, /apps.apple.com/);
  assert.ok(echo.indexOf('class="app-details-link"') < echo.indexOf('class="beta-launch-actions"'));
  const musia = html.match(/<article class="app-download-card" data-app="musia"[\s\S]*?<\/article>/)[0];
  assert.ok(musia.indexOf('data-i18n="app_musia_apple"') < musia.indexOf('class="app-download-links"'));
  const css = read('vibrant-theme.css');
  assert.match(css, /\.app-downloads > \* > \.app-details-link \{[^}]*margin-top: auto/);
  assert.match(css, /\.app-details-link \+ :is\(\.app-download-links, \.beta-launch-actions\) \{ margin-top: 0;/);
});
