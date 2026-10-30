import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {windows} from '../tools/windows-downloads.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('each Windows download uses the exact full EXE and exposes preview requirements',()=>{
 assert.equal(windows.apps.length,5);
 for(const app of windows.apps){
  for(const file of ['index.html','products/index.html','downloads/windows/index.html']){const html=read(file);assert.equal((html.match(new RegExp('data-windows-download="'+app.id+'"','g'))||[]).length,1);assert.ok(html.includes(app.url)||html.includes(new URL(app.url).pathname));}
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

test('EchoMind catalogue matches the existing binary and its own requirements',()=>{
 const app=windows.apps.find(a=>a.id==='echomind');
 const exe=fs.readFileSync(new URL('../downloads/'+app.filename,import.meta.url));
 assert.equal(exe.length,app.bytes);assert.equal(crypto.createHash('sha256').update(exe).digest('hex'),app.sha256);
 const card=read('downloads/windows/index.html').match(/<article[^>]*id="echomind"[\s\S]*?<\/article>/)?.[0];
 assert.match(card,/href="\/downloads\/echomind-windows.html"/);
 assert.match(card,/Some mobile features are not yet available/);
 assert.doesNotMatch(card,/WebView2/);
 assert.match(read('downloads/windows/index.html'),/Bunko, OnlyIdeas and LazyArtCoin require Microsoft Edge WebView2 Runtime/);
});

test("LazyArtCoin identifies local wallet backups and browser-only extensions",()=>{const app=windows.apps.find(a=>a.id==="lazyingart-coin");assert.ok(app);assert.match(app.note,/recovery phrase/);assert.match(app.note,/MetaMask/);assert.match(read("downloads/windows/index.html"),/password-encrypted wallet/);});
