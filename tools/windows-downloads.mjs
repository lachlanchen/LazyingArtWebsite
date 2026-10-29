import fs from 'node:fs';
import assert from 'node:assert/strict';
import {root,escape,downloadIcon,formatSize} from './android-downloads.mjs';
export const windows=JSON.parse(fs.readFileSync(new URL('downloads/windows/catalog.json',root),'utf8'));
for(const app of windows.apps){
 assert.match(app.id,/^(bunko|onlyideas)$/);assert.match(app.sha256,/^[a-f0-9]{64}$/);
 assert.equal(app.architecture,'x64');assert.equal(app.signed,false);assert.equal(app.channel,'preview');
 assert.ok(Number.isSafeInteger(app.bytes)&&app.bytes>1000000);
 assert.equal(app.url,`https://github.com/lachlanchen/LazyingArtWebsite/releases/download/windows-previews-20261030/${app.filename}`);
 assert.match(app.filename,/^[A-Za-z0-9.-]+\.exe$/);
}
export const windowsFor=id=>windows.apps.filter(a=>a.id===id);
export function windowsButton(app,{homepage=false}={}){
 return `<a class="${homepage?'apk-download':'store-button apk-download'} windows-download" data-windows-download="${app.id}" href="${escape(app.url)}" download="${escape(app.filename)}" aria-label="Download ${escape(app.name)} Windows preview" title="Windows 11 x64 · Unsigned preview · ${formatSize(app.bytes)}">${downloadIcon}${homepage?'<span>Windows EXE</span>':`<span><strong>Windows EXE</strong><small>x64 preview · ${formatSize(app.bytes)}</small></span>`}</a>`;
}
