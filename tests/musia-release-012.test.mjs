import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const catalog = JSON.parse(readFileSync(new URL('products/catalog.json', root)));

test('Musia exposes released Android practice, not the agent-mode beta', () => {
  const item = catalog.items.find(item => item.id === 'musia-app');
  assert.match(item.description, /pinyin.*furigana/);
  assert.match(item.description, /Do Re Mi listening quizzes/);
  assert.match(item.description, /40–160 BPM/);
  assert.match(item.description, /Android 0\.1\.2 is available/);
  assert.match(item.description, /iPhone and Mac editions are awaiting review/);
  assert.doesNotMatch(item.description, /0\.2\.0|agent.mode|subscription|microphone pitch|singing grade/i);
  assert.deepEqual(item.storeLinks.map(link => link.store), ['google-play']);
  const generated = readFileSync(new URL('products/index.html', root), 'utf8');
  assert.ok(generated.includes(item.description));
});

test('all homepage locales carry the new practice description', () => {
  const match = html.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/);
  const translations = vm.runInNewContext(`(${match[1]})`);
  assert.equal(Object.keys(translations).length, 13);
  for (const [locale, copy] of Object.entries(translations)) {
    assert.ok(copy.app_musia_desc.trim().length > 30, locale);
    assert.ok(copy.app_musia_apple.trim(), locale);
  }
  assert.match(translations.en.app_musia_desc, /pinyin or furigana.*Do Re Mi/);
  assert.match(translations['zh-Hans'].app_musia_desc, /拼音、假名.*Do Re Mi/);
});
