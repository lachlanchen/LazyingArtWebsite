import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const catalog = JSON.parse(readFileSync(new URL('products/catalog.json', root)));

test('Musia exposes released Mac and Android practice, not iOS or the agent-mode beta', () => {
  const item = catalog.items.find(item => item.id === 'musia-app');
  assert.match(item.description, /pinyin.*furigana/);
  assert.match(item.description, /Do Re Mi listening quizzes/);
  assert.match(item.description, /40–160 BPM/);
  assert.match(item.description, /Android 0\.1\.2 and Mac 0\.1\.2 are available/);
  assert.match(item.description, /iPhone edition is still in review/);
  assert.doesNotMatch(item.description, /0\.2\.0|agent.mode|subscription|microphone pitch|singing grade/i);
  assert.deepEqual(item.storeLinks.map(link => link.store), ['mac-app-store', 'google-play']);
  assert.equal(item.storeLinks[0].url, 'https://apps.apple.com/us/app/musia-learn-music-guitar/id6816265930?mt=12');
  assert.match(item.storeLinks[0].device, /^Mac ·/);
  const generated = readFileSync(new URL('products/index.html', root), 'utf8');
  assert.ok(generated.includes(item.description));
});

test('all homepage locales identify Musia briefly without temporary release notes', () => {
  const match = html.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/);
  const translations = vm.runInNewContext(`(${match[1]})`);
  assert.equal(Object.keys(translations).length, 13);
  for (const [locale, copy] of Object.entries(translations)) {
    assert.ok(copy.app_musia_desc.trim().length > 0, locale);
    assert.ok([...copy.app_musia_desc].length <= 80, locale);
    assert.equal(copy.app_musia_apple, undefined, locale);
    assert.doesNotMatch(copy.app_musia_desc, /macOS|0\.1\.2|review|Do Re Mi|pinyin|furigana/i, locale);
  }
  assert.equal(translations.en.app_musia_desc, 'A music and guitar practice app.');
  assert.equal(translations['zh-Hans'].app_musia_desc, '音乐与吉他练习应用。');
});
