import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
const html = fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const script = fs.readFileSync(new URL('../echomind-link.js',import.meta.url),'utf8');
const web = 'https://chat.lazying.art/';
const apple = 'https://apps.apple.com/app/id6793615455';
const google = 'https://play.google.com/store/apps/details?id=art.lazying.echomind';
function route(navigator) {
  const link = {href:web,dataset:{}};
  vm.runInNewContext(script,{navigator,document:{querySelectorAll(selector) {
    assert.equal(selector,'[data-echomind-link]'); return [link];
  }}});
  return link;
}
test('EchoMind is a direct usable web link without JavaScript',() => {
  assert.match(html,/<a href="https:\/\/chat.lazying.art\/" data-echomind-link target="_blank" rel="noopener noreferrer">EchoMind<\/a>/);
  assert.match(html,/<script src="echomind-link.js\?v=20261007"><\/script>/);
  assert.doesNotMatch(script,/window\.open|location\.|fetch\(|sendBeacon|localStorage|setTimeout/);
});
for (const [name,navigator,url,destination] of [
  ['Windows desktop',{userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',platform:'Win32',maxTouchPoints:0},web,'web'],
  ['Windows touchscreen',{userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',platform:'Win32',maxTouchPoints:10},web,'web'],
  ['Mac desktop',{userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',platform:'MacIntel',maxTouchPoints:0},web,'web'],
  ['Linux',{userAgent:'Mozilla/5.0 (X11; Linux x86_64)',platform:'Linux x86_64'},web,'web'],
  ['iPhone',{userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',platform:'iPhone',maxTouchPoints:5},apple,'ios'],
  ['iPad',{userAgent:'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)',platform:'iPad',maxTouchPoints:5},apple,'ios'],
  ['iPad desktop mode',{userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',platform:'MacIntel',maxTouchPoints:5},apple,'ios'],
  ['iPhone Chrome',{userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) CriOS/149.0 Mobile',platform:'iPhone'},apple,'ios'],
  ['Android phone',{userAgent:'Mozilla/5.0 (Linux; Android 15; Pixel 9)',platform:'Linux armv8l',maxTouchPoints:5},google,'android'],
  ['Android tablet',{userAgent:'Mozilla/5.0 (Linux; Android 15) Chrome/149.0 Safari/537.36',maxTouchPoints:5},google,'android'],
  ['Android client hint',{userAgent:'Mozilla/5.0',userAgentData:{platform:'Android'}},google,'android'],
  ['unknown device',{},web,'web'],
]) test(`${name} gets its intended destination`,() => {
  const link = route(navigator); assert.equal(link.href,url); assert.equal(link.dataset.destination,destination);
});
