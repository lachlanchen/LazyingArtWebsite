import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
test('Musia uses the approved ribbon artwork throughout the website', () => {
  const icon = readFileSync(new URL('logos/apps/musia.png', root));
  assert.equal(createHash('sha256').update(icon).digest('hex'), '84d4f9bad1de2c92b1dee38863c1e6dc69b5c2dd67e43b1c060fcf7ecb68e9cf');
  assert.equal(icon.readUInt32BE(16), 192);
  assert.equal(icon.readUInt32BE(20), 192);
  for (const page of ['index.html', 'products/index.html']) {
    const html = readFileSync(new URL(page, root), 'utf8');
    assert.equal([...html.matchAll(/src="[^" ]*musia\.png\?v=ribbon-20261006"/g)].length, 2);
    assert.doesNotMatch(html, /src="[^" ]*musia\.png"/);
  }
});
