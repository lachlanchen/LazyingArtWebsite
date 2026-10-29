import fs from 'node:fs';
import assert from 'node:assert/strict';
import {root,escape,downloadIcon,formatSize} from './android-downloads.mjs';
export const windows=JSON.parse(fs.readFileSync(new URL('downloads/windows/catalog.json',root),'utf8'));
for(const app of windows.apps){
 assert.match(app.id,/^(echomind|bunko|onlyideas|aimemo)$/);assert.match(app.sha256,/^[a-f0-9]{64}$/);
 assert.equal(app.architecture,'x64');assert.equal(app.signed,false);assert.equal(app.channel,'preview');
 assert.ok(Number.isSafeInteger(app.bytes)&&app.bytes>(app.id==='aimemo'?100000:1000000));
 const release=app.id==='aimemo'?'AiMemo-Downloads/releases/download/windows-v1.0.0-preview':'LazyingArtWebsite/releases/download/windows-previews-20261030';
 assert.equal(app.url,app.id==='echomind'?`https://lazying.art/downloads/${app.filename}`:`https://github.com/lachlanchen/${release}/${app.filename}`);
 if(app.icon)assert.match(app.icon,/^[a-z0-9-]+\.(jpg|png)$/);
 if(app.guide)assert.equal(app.guide,app.id==='echomind'?'/downloads/echomind-windows.html':'https://memo.lazying.art/windows.html');
 assert.match(app.filename,/^[A-Za-z0-9.-]+\.exe$/);
}
export const windowsFor=id=>windows.apps.filter(a=>a.id===id);
export function windowsButton(app,{homepage=false}={}){
 return `<a class="${homepage?'apk-download':'store-button apk-download'} windows-download" data-windows-download="${app.id}" href="${escape(app.url)}" download="${escape(app.filename)}" aria-label="Download ${escape(app.name)} Windows preview" title="${escape(app.requirements||'Windows 11 x64')} · Unsigned preview · ${formatSize(app.bytes)}">${downloadIcon}${homepage?'<span>Windows EXE</span>':`<span><strong>Windows EXE</strong><small>x64 preview · ${formatSize(app.bytes)}</small></span>`}</a>`;
}
