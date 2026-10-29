import fs from 'node:fs';
import assert from 'node:assert/strict';
import {root, downloads, apkButton} from './android-downloads.mjs';

const file = new URL('index.html', root);
const before = fs.readFileSync(file, 'utf8');
let html = before.replace(/<a\b[^>]*data-apk-download="[^"]+"[^>]*>[\s\S]*?<\/a>/g, '');
function cardLinks(card) {
  const added = new Set();
  card = card.replace(/<a\b[^>]*href="https:\/\/play\.google\.com\/store\/apps\/details\?id=([^"&]+)"[^>]*>[\s\S]*?<\/a>/g, (anchor, pkg) => {
    const app = downloads.apps.find(app => app.package === pkg);
    if (!app || added.has(app.id)) return anchor;
    added.add(app.id);
    return anchor + apkButton(app, {homepage:true, extraClass:card.startsWith('<aside') ? 'beta-download-button' : ''});
  });
  const appId = card.match(/data-app="([^"]+)"/)?.[1];
  const extra = downloads.apps.filter(app => app.productId === appId && !added.has(app.id));
  if (extra.length) {
    const buttons = extra.map(app => apkButton(app, {homepage:true})).join('');
    if (card.includes('class="app-download-links"')) card = card.replace(/(<div class="app-download-links"[^>]*>[\s\S]*?)(<\/div>)/, (_, content, end) => content + buttons + end);
    else {
      const titleId = card.match(/aria-labelledby="([^"]+)"/)?.[1];
      assert.ok(titleId);
      card = card.replace('</article>', `<div class="app-download-links" role="group" aria-labelledby="${titleId}">${buttons}</div></article>`);
    }
  }
  return card;
}
html = html.replace(/<article\b[^>]*class="[^"]*app-download-card[^>]*>[\s\S]*?<\/article>/g, cardLinks);
html = html.replace(/<aside\b[^>]*class="[^"]*beta-launch-card[^>]*>[\s\S]*?<\/aside>/g, cardLinks);
html = html.replace(/<div class="publisher-(?:footer-)?links"[^>]*>[\s\S]*?<\/div>/g, row => row.includes('data-android-catalog') ? row : row.replace('</div>', '<a href="/downloads/" data-android-catalog data-i18n="android_downloads_label" target="_blank" rel="noopener noreferrer">Android downloads</a></div>'));
html = html.replace('/store-links.css?v=20261020', '/store-links.css?v=20261029-apk').replace('app-release-translations.js?v=20261020-coin-network', 'app-release-translations.js?v=20261029-apk');
if (process.argv.includes('--check')) assert.equal(before, html, 'Regenerate homepage Android download links');
else fs.writeFileSync(file, html);
console.log(`Homepage: ${(html.match(/data-apk-download=/g) || []).length} direct Android links`);
