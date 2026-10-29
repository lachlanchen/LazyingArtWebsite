import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {windows} from '../tools/windows-downloads.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('each Windows download uses the exact full EXE and exposes preview requirements',()=>{
 assert.equal(windows.apps.length,3);
 for(const app of windows.apps){
  for(const file of ['index.html','products/index.html','downloads/windows/index.html']){const html=read(file);assert.ok(html.includes('data-windows-download="'+app.id+'"'));assert.ok(html.includes(app.url));}
  assert.ok(read('downloads/windows/index.html').includes(app.sha256));
 }
 const html=read('downloads/windows/index.html');assert.match(html,/unsigned/);assert.match(html,/WebView2 Runtime/);assert.match(html,/Windows 11/);assert.doesNotMatch(html,/rel="(?:preload|prefetch)"|<iframe|<object/);
});
test('Windows additions preserve the existing Android catalogue and links',()=>{assert.equal(JSON.parse(read('downloads/catalog.json')).apps.length,23);assert.equal((read('products/index.html').match(/data-apk-download=/g)||[]).length,23);assert.equal((read('index.html').match(/data-apk-download=/g)||[]).length,22);});

test('EchoMind Windows download remains intact',()=>{for(const file of ['index.html','products/index.html'])assert.match(read(file),/data-windows-download="echomind"/);});

test('AiMemo keeps its exact installer and Edge requirements separate from portable apps',()=>{
 const app=windows.apps.find(a=>a.id==='aimemo');
 assert.equal(app.bytes,303672);
 assert.equal(app.sha256,'58b170381f301b24d2ef57e97bd762325ea5161f1f9c65d90555c5b57f611eb1');
 assert.equal(app.url,'https://github.com/lachlanchen/AiMemo-Downloads/releases/download/windows-v1.0.0-preview/AiMemo-Setup-1.0.0-x64.exe');
 const card=read('downloads/windows/index.html').match(/<article[^>]+id="aimemo"[\s\S]*?<\/article>/)?.[0];
 assert.ok(card);
 for(const text of ['Microsoft Edge','Per-user installer','Unsigned preview',app.guide,'aimemo.jpg'])assert.ok(card.includes(text));
 assert.doesNotMatch(card,/\.NET included|WebView2 Runtime|No installer/);
 for(const file of ['index.html','products/index.html'])assert.equal((read(file).match(/data-windows-download="aimemo"/g)||[]).length,1);
});
