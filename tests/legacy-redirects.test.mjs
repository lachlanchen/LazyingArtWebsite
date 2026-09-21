import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
const root = new URL('../', import.meta.url);
const data = JSON.parse(fs.readFileSync(new URL('legacy-redirects.json', root), 'utf8'));
execFileSync('node', [new URL('tools/build-legacy-redirects.mjs', root).pathname, '--check']);
const source = fs.readFileSync(new URL('legacy-post-redirect.js', root), 'utf8');
assert.doesNotMatch(fs.readFileSync(new URL('index.html', root), 'utf8'), /href="https:\/\/coin\.lazying\.art/);
for (const [query, expected] of [['?p=2883', data.postIds['2883']], ['?p=999999', null], ['?p=__proto__', null], ['?p=2883&p=3117', null], ['?redirect=https://evil.example', null], ['', null]]) {
  let destination = null;
  vm.runInNewContext(source, { URLSearchParams, window: { location: { pathname: '/', search: query, replace: (url) => { destination = url; } } } });
  assert.equal(destination, expected);
}
const sitemap = fs.readFileSync(new URL('sitemap.xml', root), 'utf8');
for (const sourcePath of Object.keys(data.pages)) {
  assert.ok(!sitemap.includes(`https://lazying.art${sourcePath}</loc>`), 'redirects are not index targets');
}
assert.ok(!Object.hasOwn(data.postIds, '999999'), 'unverified IDs are not guessed');
assert.ok(!fs.readFileSync(new URL('404.html', root), 'utf8').includes('location.replace'), 'no blanket 404 redirect');
assert.ok(!fs.readFileSync(new URL('404.html', root), 'utf8').includes('http-equiv="refresh"'), 'unknown pages do not refresh to the homepage');
console.log('Exact legacy redirects and unknown/private destination guards pass');
