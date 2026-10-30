import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), 'utf8');
test('ClearPair combined Apple app has released iPhone/iPad and Mac routes', () => {
  const urls = ['iphone', 'mac'].map(platform => `https://apps.apple.com/us/app/clearpair/id6819458905?platform=${platform}`);
  const home = read('index.html');
  const card = home.match(/<article[^>]+data-app="clearpair"[\s\S]*?<\/article>/)[0];
  for (const url of urls) assert.ok(card.includes(url));
  assert.match(card, /Eight pronunciation and script courses/);
  assert.match(card, /iPhone, iPad and Mac/);
  assert.match(card, /US\$0\.99/);
  assert.doesNotMatch(card, /play\.google|testflight|credit wallet|200 credits/i);
  assert.ok(fs.existsSync(new URL('logos/apps/clearpair.png', root)));
  assert.match(home, /href="#clearpair-download-title"/);
  const item = JSON.parse(read('products/catalog.json')).items.find(p => p.id === 'clearpair');
  assert.equal(item.url, urls[0]);
  assert.deepEqual(item.storeLinks.map(link => link.url), urls);
  assert.match(item.storeLinks[0].device, /iPhone · iPad · iOS 15\+/);
  assert.match(item.storeLinks[1].device, /macOS 12\.3/);
  const product = read('products/index.html').match(/<article id="clearpair"[\s\S]*?<\/article>/)[0];
  for (const url of urls) assert.ok(product.includes(url));
  assert.match(product, /One purchase includes all eight courses/);
  const context = {window: {}};
  vm.runInNewContext(read('app-release-translations.js'), context);
  const copies = Object.values(context.window.appReleaseTranslations);
  assert.equal(copies.length, 13);
  for (const copy of copies) {
    for (const device of ['iPhone', 'iPad', 'Mac']) assert.ok(copy.app_clearpair_apple_desc.includes(device));
    assert.equal(copy.app_clearpair_mac_desc, undefined);
  }
});
