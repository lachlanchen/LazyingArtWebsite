import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const read = name => fs.readFileSync(new URL(name, root), 'utf8');
const file = '/downloads/EchoMind-1.0.1-preview.1-win-x64.exe';
const bytes = fs.readFileSync(new URL(file.slice(1), root));
const hash = crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(bytes.length, 49683044);
assert.equal(hash, 'adcafdb8076e7ab305fb99a678183b3c3c577786a2bf6daf7c68a77adec348ba');
assert.equal(bytes.toString('ascii', 0, 2), 'MZ');
const pe = bytes.readUInt32LE(0x3c);
assert.equal(bytes.toString('ascii', pe, pe + 4), 'PE\0\0');
assert.equal(bytes.readUInt16LE(pe + 4), 0x8664, 'native Windows x64 executable');

const home = read('index.html');
const card = home.match(/<aside class="beta-launch-card"[\s\S]*?<\/aside>/)?.[0];
assert.ok(card?.includes(`href="${file}"`));
assert.match(card, /data-windows-download="echomind"/);
assert.match(card, /download="EchoMind-1.0.1-preview.1-win-x64.exe"/);
assert.match(card, /id="echomind-windows-note"/);
assert.match(home, /\.beta-download-button\s*\{[^}]*background:\s*#0060cd/);
assert.match(card, /href="\/downloads\/echomind-windows.html"/);
assert.match(card, /apps.apple.com\/app\/id6793615455/);
assert.match(card, /platform=mac/);
assert.match(card, /play.google.com\/store\/apps\/details\?id=art.lazying.echomind/);
const match = home.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/);
assert.ok(match);
const translations = vm.runInNewContext(`(${match[1]})`);
assert.equal(Object.keys(translations).length, 13);
for (const [locale, dictionary] of Object.entries(translations)) {
  for (const key of ['echomind_windows_download', 'echomind_windows_details']) {
    assert.ok(dictionary[key]?.trim(), `${locale}.${key}`);
  }
}

const catalog = JSON.parse(read('products/catalog.json'));
const downloads = catalog.items.filter(item => item.windowsDownload);
assert.deepEqual(downloads.map(item => item.id), ['echomind']);
assert.equal(downloads[0].windowsDownload, file);
const directory = read('products/index.html');
assert.match(directory, /class="store-button windows-download"/);
assert.ok(directory.includes(`href="${file}"`));
const details = read('downloads/echomind-windows.html');
assert.ok(details.includes(hash));
assert.match(details, /49,683,044 bytes/);
assert.match(details, /Unsigned preview/);
assert.match(details, /Keep your security protections enabled/);
assert.match(details, /Complete live-account workflow testing and Windows 10 runtime testing remain pending/);
assert.match(details, /Native Google\/Apple sign-in, voice and attachments/);
assert.doesNotMatch(details, /disable (?:SmartScreen|antivirus|security)|bypass/i);
assert.ok(details.includes(`href="${file}"`));
console.log('Windows EXE identity, separate preview links, limitations and 13 locales passed');
