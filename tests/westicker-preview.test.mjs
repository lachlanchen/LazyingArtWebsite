import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('WeSticker exposes its web beta without inventing a native release',()=>{
 const item=JSON.parse(read('products/catalog.json')).items.find(x=>x.id==='westicker');
 assert.equal(item.url,'https://westicker.lazying.art/');
 assert.equal(item.storeLinks,undefined);
 assert.equal(item.webApp,item.url);
 assert.match(item.kind,/Web beta.*Native apps in testing/);
 const card=read('products/index.html').match(/<article id="westicker"[\s\S]*?<\/article>/)[0];
 assert.match(card,/data-web-app/);
 assert.doesNotMatch(card,/apps.apple.com|play.google.com|checkout/);
 assert.ok(existsSync(new URL('../logos/apps/'+item.icon,import.meta.url)));
 const home=read('index.html');
 assert.match(home,/id="westicker-download-title"/);
 assert.doesNotMatch(home,/id="westicker-preview"/);
 assert.match(home,/href="products\/#westicker"/);
 const context={window:{}};
 vm.runInNewContext(read('app-release-translations.js'),context);
 for(const dict of Object.values(context.window.appReleaseTranslations)) {
   for (const key of ['app_westicker_desc','app_weblog_desc','internal_testing_label']) assert.ok(dict[key]?.trim());
 }
});
test('WeBlog is an internal preview, not a private API or store download',()=>{
 const item=JSON.parse(read('products/catalog.json')).items.find(x=>x.id==='weblog');
 assert.equal(item.preview,true);
 assert.equal(item.webApp,undefined);
 assert.equal(item.storeLinks,undefined);
 assert.equal(item.repository,undefined);
 const card=read('products/index.html').match(/<article id="weblog"[\s\S]*?<\/article>/)[0];
 assert.match(card,/Internal testing/);
 assert.doesNotMatch(card,/<a |data-web-app|store-button/);
 assert.doesNotMatch(read('index.html')+card,/https:\/\/(?:weblog.lazying.art|github.com\/lachlanchen\/WeBlog)/);
});
