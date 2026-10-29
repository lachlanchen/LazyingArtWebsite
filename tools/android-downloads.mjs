import fs from 'node:fs';
import assert from 'node:assert/strict';

export const root = new URL('../', import.meta.url);
export const downloads = JSON.parse(fs.readFileSync(new URL('downloads/catalog.json', root), 'utf8'));
export const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
export const downloadIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const formatSize = bytes => `${(bytes / 1000000).toFixed(1)} MB`;
export const androidVersion = sdk => ({24:'7.0',25:'7.1',26:'8.0',27:'8.1',28:'9',29:'10',30:'11',31:'12',32:'12L',33:'13',34:'14',35:'15',36:'16'}[sdk] || `API ${sdk}`);

assert.equal(new Set(downloads.apps.map(app => app.id)).size, downloads.apps.length);
assert.equal(new Set(downloads.apps.map(app => app.package)).size, downloads.apps.length);
for (const app of downloads.apps) {
  assert.match(app.id, /^[a-z0-9-]+$/);
  assert.match(app.package, /^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)+$/);
  assert.match(app.filename, /^[A-Za-z0-9.-]+\.apk$/);
  assert.match(app.sha256, /^[a-f0-9]{64}$/);
  assert.match(app.certificateSha256, /^[a-f0-9]{64}$/);
  assert.ok(Number.isSafeInteger(app.bytes) && app.bytes > 1000);
  assert.ok(Number.isSafeInteger(app.build) && app.build > 0);
  assert.ok(Number.isSafeInteger(app.minSdk) && app.minSdk >= 21);
  assert.ok(['direct', 'preview'].includes(app.channel));
  const url = new URL(app.url);
  assert.equal(url.username + url.password + url.search + url.hash, '');
  const releasePath = /^\/lachlanchen\/LazyingArtWebsite\/releases\/download\/android-apks-\d{8}\/([^/]+)$/.exec(url.pathname);
  assert.ok(url.href === `https://lazying.art/downloads/${app.filename}` || (url.origin === 'https://github.com' && releasePath?.[1] === app.filename));
  assert.ok(fs.existsSync(new URL(app.icon.slice(1), root)));
}

export const downloadsFor = productId => downloads.apps.filter(app => app.productId === productId);
export function apkButton(app, {homepage = false, extraClass = ''} = {}) {
  const label = app.id === 'landn-pro' ? 'Android Pro APK' : 'Android APK';
  const version = `${app.version} (${app.build}) · ${formatSize(app.bytes)}`;
  return `<a class="${homepage ? 'apk-download' : 'store-button apk-download'}${extraClass ? ' '+extraClass : ''}" data-apk-download="${escape(app.id)}" href="${escape(app.url)}" download="${escape(app.filename)}" aria-label="Download ${escape(app.name)} ${escape(app.version)} Android APK" title="${escape(version)}">${downloadIcon}${homepage ? `<span data-i18n="${app.id === 'landn-pro' ? 'android_pro_apk_label' : 'android_apk_label'}">${label}</span>` : `<span><strong>${label}</strong><small>${escape(version)}</small></span>`}</a>`;
}
