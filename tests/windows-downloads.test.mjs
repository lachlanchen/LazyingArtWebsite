import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {windows} from '../tools/windows-downloads.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('each Windows download uses the exact full EXE and exposes preview requirements',()=>{
 assert.equal(windows.apps.length,2);
 for(const app of windows.apps){
  for(const file of ['index.html','products/index.html','downloads/windows/index.html']){const html=read(file);assert.ok(html.includes('data-windows-download="'+app.id+'"'));assert.ok(html.includes(app.url));}
  assert.ok(read('downloads/windows/index.html').includes(app.sha256));
 }
 const html=read('downloads/windows/index.html');assert.match(html,/unsigned/);assert.match(html,/WebView2 Runtime/);assert.match(html,/Windows 11/);assert.doesNotMatch(html,/rel="(?:preload|prefetch)"|<iframe|<object/);
});
test('Windows additions preserve the existing Android catalogue and links',()=>{assert.equal(JSON.parse(read('downloads/catalog.json')).apps.length,23);assert.equal((read('products/index.html').match(/data-apk-download=/g)||[]).length,23);assert.equal((read('index.html').match(/data-apk-download=/g)||[]).length,22);});

test('EchoMind Windows download remains intact',()=>{for(const file of ['index.html','products/index.html'])assert.match(read(file),/data-windows-download="echomind"/);});
