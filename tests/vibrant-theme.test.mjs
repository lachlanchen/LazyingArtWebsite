import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
const read=name=>fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');
const theme=read('vibrant-theme.css');
const products=read('products/styles.css');
function luminance(hex) {
  const c=hex.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return c[0]*.2126+c[1]*.7152+c[2]*.0722;
}
test('all solid app-button colours support readable white labels',() => {
  for(const colour of new Set([...theme.matchAll(/--app-accent: (#[0-9a-f]{6});/g),...products.matchAll(/--card-accent: (#[0-9a-f]{6});/g)].map(m=>m[1]))) {
    assert.ok(1.05/(luminance(colour)+.05)>=4.5,colour);
  }
});
test('fresh palette preserves dark mode, reduced motion and catalogue keys',() => {
  assert.match(read('index.html'),/vibrant-theme.css\?v=20261007/);
  assert.match(theme,/body\[data-theme="dark"\]/);
  assert.match(theme,/prefers-reduced-motion: reduce/);
  assert.doesNotMatch(products,/#fcf9f4|#fbf3d9|#f8e8d7|#fff0e3/);
  assert.match(products,/\.tone-yellow \{[^}]*background: #ddf5f8/);
  assert.match(read('products/index.html'),/styles.css\?v=20261007-vibrant/);
});
