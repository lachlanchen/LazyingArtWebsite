import fs from 'node:fs';
import assert from 'node:assert/strict';
import {root, downloads, escape, apkButton, formatSize, androidVersion} from './android-downloads.mjs';
import {openPageLinksInNewTabs} from './page-link-policy.mjs';

const products = JSON.parse(fs.readFileSync(new URL('products/catalog.json', root), 'utf8')).items;
const cards = downloads.apps.map(app => `<article class="download-card" id="${escape(app.id)}" data-download-card data-search="${escape(`${app.name} ${app.package} ${products.find(item => item.id === app.productId)?.description || ''}`.toLowerCase())}">
  <div class="card-heading"><img src="${escape(app.icon)}" alt="" width="64" height="64" loading="lazy"><div><h2>${escape(app.name)}</h2><p>${escape(app.version)} <span>· Build ${app.build}</span></p></div>${app.channel === 'preview' ? '<span class="preview">Preview</span>' : ''}</div>
  <p class="requirements">Android ${escape(androidVersion(app.minSdk))}+ <span aria-hidden="true">·</span> ${formatSize(app.bytes)}</p>
  ${apkButton(app)}
  <div class="card-links"><a href="/products/#${escape(app.productId)}">About the app</a><details><summary>File details</summary><dl><dt>Package</dt><dd>${escape(app.package)}</dd><dt>SHA-256</dt><dd><code>${app.sha256}</code></dd><dt>Signing certificate SHA-256</dt><dd><code>${app.certificateSha256}</code></dd>${app.abis.length ? `<dt>Processors</dt><dd>${escape(app.abis.join(', '))}</dd>` : ''}</dl></details></div>
</article>`).join('\n');
const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Android downloads · LazyingArt</title>
<meta name="description" content="Download signed Android APKs for Bunko, OnlyIdeas, EchoMind, AiMemo and more LazyingArt apps. Find versions, file sizes and installation details.">
<link rel="canonical" href="https://lazying.art/downloads/">
<meta property="og:title" content="Android downloads · LazyingArt"><meta property="og:description" content="Signed APKs for reading, research, learning and creating."><meta property="og:type" content="website"><meta property="og:url" content="https://lazying.art/downloads/">
<meta name="theme-color" content="#f5f8ff"><link rel="icon" href="/favicon.ico">
<link rel="stylesheet" href="/products/styles.css?v=20261015-bunko-film"><link rel="stylesheet" href="/store-links.css?v=20261029-apk"><link rel="stylesheet" href="styles.css?v=20261029"><script src="downloads.js" defer></script>
</head><body>
<a class="skip-link" href="#main">Skip to downloads</a>
<header class="site-header"><a class="brand" href="/"><img src="/logos/panda-v1/logo-256.png" alt="" width="48" height="48"><span><strong>LazyingArt</strong><small>The art of lazying.</small></span></a><nav aria-label="Primary navigation"><a href="/">Home</a><a href="/products/">Apps &amp; products</a><a href="/downloads/" aria-current="page">Android downloads</a><a href="/downloads/windows/">Windows downloads</a></nav></header>
<main id="main"><section class="download-intro"><p class="eyebrow">LazyingArt apps</p><h1>Android downloads</h1><p class="lead">Signed APKs for reading, research, learning and creating. Choose an app and open the downloaded file on your Android device.</p><details class="install-help"><summary>Installing and updating</summary><p>Android may ask you to allow installations from your browser or Files app. Preview builds can include changes not yet available in the stores.</p><p>If you installed an app from Google Play, update it there. Direct APKs can use a different signing certificate; keep your existing app and data if Android declines an update.</p></details></section>
<section aria-label="Android apps"><div class="download-toolbar"><p><strong>${downloads.apps.length} Android apps</strong> <span>· Updated ${downloads.updated}</span></p><label class="download-search" hidden>Find an app<input id="download-search" type="search" placeholder="Bunko, research, ClearPair…" autocomplete="off"></label></div><p id="download-count" class="download-count" role="status" aria-live="polite"></p><div class="download-grid">${cards}</div><p id="download-empty" hidden>No matching apps. Try another name.</p></section></main>
<footer class="directory-footer"><span>LazyingArt</span><a href="/products/">Explore all apps and products</a><a href="catalog.json">Download catalogue</a></footer>
</body></html>\n`;
const rendered = openPageLinksInNewTabs(html);
const destination = new URL('downloads/index.html', root);
if (process.argv.includes('--check')) assert.equal(fs.readFileSync(destination, 'utf8'), rendered, 'Regenerate the Android downloads page');
else fs.writeFileSync(destination, rendered);
console.log(`Android downloads: ${downloads.apps.length} signed packages`);
