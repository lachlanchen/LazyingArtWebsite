import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const urls = [
  'https://apps.apple.com/developer/lazyingart-llc/id1867662412',
  'https://play.google.com/store/apps/developer?id=LazyingArt+LLC',
];
for (const file of ['index.html', 'products/index.html']) {
  test(`${file}: publisher links appear by the app collection and in the footer`, () => {
    const html = readFileSync(new URL(file, root), 'utf8');
    const row = html.match(/<div class="publisher-links"[\s\S]*?<\/div>/)[0];
    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)[0];
    for (const url of urls) {
      const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map(m => m[0]).filter(tag => tag.includes(`href="${url}"`));
      assert.equal(anchors.length, 2);
      for (const tag of anchors) {
        assert.match(tag, /target="_blank"/);
        assert.match(tag, /rel="noopener noreferrer"/);
      }
      assert.ok(row.includes(url));
      assert.ok(footer.includes(url));
    }
    assert.ok(!html.includes('/store/apps/collection/'), 'Use the stable developer page, not an opaque collection URL');
    assert.match(row, /All LazyingArt apps/);
  });
}
test('all-apps label is localized in every homepage language', () => {
  const window = {};
  vm.runInNewContext(readFileSync(new URL('app-release-translations.js', root), 'utf8'), {window});
  assert.equal(Object.keys(window.appReleaseTranslations).length, 13);
  for (const dict of Object.values(window.appReleaseTranslations)) assert.ok(dict.all_apps_label?.includes('LazyingArt'));
});
