import fs from 'node:fs';
import assert from 'node:assert/strict';
import {openPageLinksInNewTabs} from './page-link-policy.mjs';

const root = new URL('../', import.meta.url);
const catalog = JSON.parse(fs.readFileSync(new URL('products/catalog.json', root), 'utf8'));
const guides = JSON.parse(fs.readFileSync(new URL('products/guides.json', root), 'utf8'));
for (const guide of guides) {
  const url = new URL(guide.url);
  assert.equal(url.origin, 'https://blog.lazying.art');
  assert.equal(url.search, '');
  assert.equal(url.hash, '');
}
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
// Reuse the homepage's decorative device / Play symbols; the link text stays
// readable and actionable without scripts, images, or a third-party badge host.
const stores = {
  'mac-app-store': {
    name: 'Mac App Store', device: 'Mac', host: 'apps.apple.com',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M12 17v4M7 21h10"></path></svg>'
  },
  'app-store': {
    name: 'App Store', device: 'iPhone · iPad · Apple Watch', host: 'apps.apple.com',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><rect x="7" y="2" width="10" height="20" rx="2"></rect><path d="M11 18h2"></path></svg>'
  },
  'google-play': {
    name: 'Google Play', device: 'Android', host: 'play.google.com',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M4.7 3.3a1.6 1.6 0 0 0-.7 1.3v14.8c0 .5.3 1 .7 1.3l8.5-8.7-8.5-8.7Zm9.6 7.6 2.4-2.5-8.9-5a2 2 0 0 0-1.2-.3l7.7 7.8Zm0 2.2-7.7 7.8c.4 0 .8-.1 1.2-.3l8.9-5-2.4-2.5Zm3.8-3.9-2.7 2.8 2.7 2.8 1.6-.9c1.2-.7 1.2-2.4 0-3.1l-1.6-.9Z"></path></svg>'
  }
};
const storeLinks = (item) => item.storeLinks?.length ? `
      <div class="store-links" role="group" aria-label="${escape(item.name)} app downloads">${item.storeLinks.map(link => {
        const store = stores[link.store];
        const label = store.name + (link.edition ? ` ${link.edition}` : '');
        return `<a class="store-button" data-store="${escape(link.store)}" href="${escape(link.url)}" aria-label="${escape(item.name)} on the ${escape(label)}">${store.icon}<span><strong>${escape(label)}</strong><small>${escape(link.device || store.device)}</small></span></a>`;
      }).join('')}${item.webApp ? `<a class="store-button web-app-button" data-web-app href="${escape(item.webApp)}" aria-label="${escape(item.name)} ${item.webPreview ? 'web preview' : 'web app'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg><span><strong>${item.webPreview ? 'Web preview' : 'Web app'}</strong><small>Open in your browser</small></span></a>` : ''}</div>` : '';
const canonical = 'https://lazying.art/products/';
const description = 'Discover LazyingArt apps, multilingual books, learning resources, creative tools, and open-source projects. Try L & N, read a book, or explore a practical workflow.';
const publisherLinks = '<a href="https://apps.apple.com/developer/lazyingart-llc/id1867662412" target="_blank" rel="noopener noreferrer">App Store <span aria-hidden="true">↗</span></a><a href="https://play.google.com/store/apps/developer?id=LazyingArt+LLC" target="_blank" rel="noopener noreferrer">Google Play <span aria-hidden="true">↗</span></a>';
assert.equal(new Set(catalog.items.map(item => item.id)).size, catalog.items.length);
for (const item of catalog.items) {
  assert.ok(catalog.groups.some(group => group.id === item.group));
  assert.equal(new URL(item.url).protocol, 'https:');
  if (item.webApp) {
    const web = new URL(item.webApp);
    assert.equal(web.protocol, 'https:');
    assert.ok(web.hostname.endsWith('.lazying.art') || web.hostname === 'agent.onlyideas.art');
    assert.equal(web.username + web.password + web.port + web.search + web.hash, '');
    assert.ok(item.storeLinks?.length, 'Web app buttons belong to the app collection');
  }
  if (item.repository) assert.match(item.repository, /^https:\/\/github\.com\/(?:lachlanchen|lazyingart)\/[A-Za-z0-9_.-]+$/);
  if (item.storyUrl) {
    const story = new URL(item.storyUrl);
    assert.equal(story.origin, 'https://blog.lazying.art');
    assert.equal(story.search + story.hash, '');
    assert.notEqual(item.storyUrl, item.url, 'The primary action already links this introduction');
  }
  if (item.storeLinks) {
    assert.ok(Array.isArray(item.storeLinks));
    assert.equal(new Set(item.storeLinks.map(link => link.url)).size, item.storeLinks.length);
    assert.equal(new Set(item.storeLinks.map(link => `${link.store}:${link.edition || ''}`)).size, item.storeLinks.length);
    for (const link of item.storeLinks) {
      assert.ok(Object.hasOwn(stores, link.store), 'Use a supported public app store');
      if (link.edition) assert.ok(link.store === 'google-play' && link.edition === 'Pro', 'Only the verified Android Pro edition has a separate label');
      const url = new URL(link.url);
      assert.equal(url.protocol, 'https:');
      assert.equal(url.hostname, stores[link.store].host);
      assert.equal(url.username + url.password + url.port + url.hash, '');
      if (link.store === 'app-store' || link.store === 'mac-app-store') {
        assert.match(url.pathname, /^\/(?:[a-z]{2}\/)?app\/[^/]+\/id\d+$/);
        if (link.store === 'mac-app-store') assert.equal(url.search, '?platform=mac');
        else assert.ok(['', '?platform=iphone'].includes(url.search), 'Use the default or explicit iPhone listing');
      } else {
        assert.equal(url.pathname, '/store/apps/details');
        assert.deepEqual([...url.searchParams.keys()], ['id']);
        assert.match(url.searchParams.get('id'), /^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)+$/i);
      }
    }
  }
}
const schema = {
  '@context': 'https://schema.org', '@type': 'CollectionPage',
  name: catalog.title, url: canonical, description,
  publisher: {'@type':'Organization', name:'LazyingArt', url:'https://lazying.art/'},
  mainEntity: {'@type':'ItemList', itemListElement: catalog.items.map((item, i) => ({
    '@type':'ListItem', position:i+1, item:{'@type':'WebPage', name:item.name, url:item.url, description:item.description}
  }))}
};
const appDesign = {
  onlyideas: ['onlyideas.png', 'mint', 'Follow your curiosity.'],
  bunko: ['bunko.png', 'peach', 'Old books. New ways in.'],
  landn: ['landn.png', 'blue', 'Hear it. Say it. Try again.'],
  lazyedit: ['lazyedit.webp', 'pink', 'Your video. Your private Studio.'],
  'musia-app': ['musia.png?v=ribbon-20261006', 'pink', 'Make time for music.'],
  aimemo: ['aimemo.jpg', 'yellow', 'Keep the thought.'],
  echomind: ['echomind.png', 'lavender', 'A conversation across languages.'],
  shigame: ['shi.jpg', 'peach', 'History is full of choices.'],
  lazyoracle: ['lazyoracle.png', 'lavender', 'A moment to reflect.'],
  'lightmind-agent': ['lightmind.jpg', 'blue', 'A companion for your glasses.'],
  'clearpair-handf': ['clearpair-handf.webp', 'peach', 'H or F? Start with the sound.'],
  'clearpair-landr': ['clearpair-landr.webp', 'blue', 'A little practice with L and R.'],
  'clearpair-english': ['clearpair-english.webp', 'mint', 'Stay with the tricky sounds.'],
  'clearpair-chinese': ['clearpair-chinese.webp', 'yellow', 'Make time for Mandarin.'],
  'clearpair-cantonese': ['clearpair-cantonese.webp', 'lavender', 'Listen a little closer.'],
  'clearpair-korean': ['clearpair-korean.webp', 'peach', 'Get to know Hangul.'],
  'clearpair-arabic': ['clearpair-arabic.webp', 'mint', 'A dot can make a difference.'],
  'clearpair-japanese': ['clearpair-japanese.webp', 'pink', 'One kana. One sound.']
};
const categoryLabels = {learn: 'Learn', build: 'Build', create: 'Create', play: 'Play', research: 'Research', about: 'About'};
const apps = Object.keys(appDesign).map(id => {
  const item = catalog.items.find(item => item.id === id);
  assert.ok(item?.storeLinks?.length, `App spotlight requires a verified store: ${id}`);
  assert.ok(fs.existsSync(new URL(`logos/apps/${appDesign[id][0].split('?')[0]}`, root)));
  return item;
});
const card = item => {
  const design = appDesign[item.id];
  const spotlight = item.id === 'onlyideas';
  const group = catalog.groups.find(group => group.id === item.group);
  const primaryLink = item.webApp === item.url || item.storeLinks?.some(link => link.url === item.url) ? '' : `<a href="${escape(item.url)}">${escape(item.action)} <span aria-hidden="true">↗</span></a>`;
  const secondaryLinks = `${primaryLink}${item.storyUrl ? `<a class="source-link" href="${escape(item.storyUrl)}">Read the story</a>` : ''}${item.repository ? `<a class="source-link" href="${escape(item.repository)}">Source: ${escape(item.repository.split('/').at(-1))}</a>` : ''}`;
  return `<article id="${escape(item.id)}" class="product-card ${design ? `app-card tone-${design[1]}` : 'project-card'}${spotlight ? ' spotlight' : ''}" data-product data-category="${escape(item.group)}"${design ? ' data-app' : ''}>
      <div class="card-content">
        <div class="card-top">${design ? `<img class="app-icon" src="../logos/apps/${design[0]}" alt="" width="80" height="80" loading="lazy">` : `<span class="project-mark" aria-hidden="true">${escape(item.name.slice(0, 1))}</span>`}<span class="card-label">${design ? (item.id === 'lightmind-agent' ? 'Companion brand' : 'LazyingArt app') : escape(group.name)}</span><span class="card-spark" aria-hidden="true">↗</span></div>
        ${design ? `<p class="card-tagline">${escape(design[2])}</p>` : ''}
        <h3>${escape(item.name)}</h3>
        <p class="work-kind">${escape(item.kind)}</p>
        <p class="card-description">${escape(item.description)}</p>
        ${storeLinks(item)}
        ${secondaryLinks ? `<div class="link-row">${secondaryLinks}</div>` : ''}
      </div>${spotlight ? `<div class="spotlight-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="icon-plinth"><img src="../logos/apps/onlyideas.png" alt="" width="180" height="180" loading="lazy"></div><span class="art-chip chip-one">Equations &amp; figures</span><span class="art-chip chip-two">Parallel text</span><span class="art-caption">A little space for big ideas.</span></div>` : ''}
    </article>`;
};
const sections = catalog.groups.map(group => `<section class="work-section" id="${escape(group.id)}" data-section aria-labelledby="${escape(group.id)}-title">
  <div class="work-heading"><h2 id="${escape(group.id)}-title">${escape(group.name)}</h2><p>${escape(group.intro)}</p></div>
  <div class="work-grid">${catalog.items.filter(item => item.group === group.id && !appDesign[item.id]).map(card).join('\n')}</div>
</section>`).join('\n');
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#fcf9f4">
  <title>Apps, Books &amp; Open-Source Tools · LazyingArt</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="LazyingArt">
  <meta property="og:title" content="Apps, Books &amp; Open-Source Tools · LazyingArt">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://lazying.art/logos/banner.png">
  <meta property="og:image:alt" content="LazyingArt">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://lazying.art/logos/banner.png">
  <link rel="icon" href="../favicon.ico" sizes="any">
  <link rel="stylesheet" href="styles.css?v=20261007-vibrant&amp;stores=20261008">
  <script src="directory.js" defer></script>
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to products</a>
  <header class="site-header">
    <a class="brand" href="../"><img src="/logos/panda-v1/logo-256.png" alt="" width="56" height="56"><span><strong>LazyingArt</strong><small>The art of lazying.</small></span></a>
    <nav aria-label="Primary navigation"><a href="../">Home</a><a href="./" aria-current="page">Discover</a><a href="https://platform.lazying.art/">Apps &amp; shop</a><a href="https://blog.lazying.art/">Stories</a></nav>
    <button class="motion-toggle" type="button" data-motion-toggle aria-pressed="false" hidden>Motion: on</button>
  </header>
  <main id="main">
    <section class="directory-hero" aria-labelledby="hero-title">
      <div class="hero-copy"><p class="eyebrow"><span aria-hidden="true">✳</span> Small tools. A little more life.</p><h1 id="hero-title">Make room for<br><em>the good stuff.</em></h1><p class="lead">A book you finally get into. A sound you learn to say. A song you play just for yourself. Tools for the things worth making time for.</p><div class="hero-actions"><a class="button primary" href="#apps">Find your next app <span aria-hidden="true">↗</span></a><a class="button secondary" href="#learn">Explore the books <span aria-hidden="true">→</span></a></div><p class="hero-footnote">Independent apps. Open-source projects. Made with curiosity.</p></div>
      <div class="hero-playground"><span class="playground-spark" aria-hidden="true">✳</span><p class="playground-label">A little collection of possibilities</p><div class="icon-board">${apps.slice(0, 6).map((item, i) => `<a class="hero-app hero-app-${i}" href="#${item.id}"><img src="../logos/apps/${appDesign[item.id][0]}" alt="" width="96" height="96"><span>${escape(item.id === 'landn' ? 'L & N' : item.id === 'musia-app' ? 'Musia' : item.name)}</span></a>`).join('')}</div><span class="playground-note">Read. Learn. Make. Repeat.</span></div>
    </section>
    <div class="discovery-toolbar" id="directory">
      <div class="discovery-heading"><h2>What are you curious about?</h2><label class="search-box" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m16 16 5 5"></path></svg><span class="sr-only">Search apps, books and tools</span><input type="search" id="product-search" placeholder="Try reading, music, Python…" autocomplete="off"></label></div>
      <nav class="directory-nav" aria-label="Product categories"><a href="#directory" data-filter="all" aria-current="true">Everything <span>${catalog.items.length}</span></a><a href="#apps" data-filter="apps">Apps <span>${apps.length}</span></a>${catalog.groups.map(group => `<a href="#${escape(group.id)}" data-filter="${escape(group.id)}">${escape(categoryLabels[group.id] || group.name)}</a>`).join('')}<a href="#guides" data-filter="guides">Guides</a></nav>
      <p class="result-status" role="status" aria-live="polite" aria-atomic="true"></p>
    </div>
    <div class="empty-state" hidden><span aria-hidden="true">✳</span><h2>Not in the collection. Yet.</h2><p>Try a different word, or have a look around.</p><button class="button primary" type="button" data-reset>Show everything</button></div>
    <section class="work-section apps-section" id="apps" data-section aria-labelledby="apps-title"><div class="work-heading"><div><p class="eyebrow">Ready when you are</p><h2 id="apps-title">Small apps.<br><em>Possibilities, everywhere.</em></h2></div><p>A few minutes to read, practise, create or play. Pick something that feels like you.</p></div><div class="publisher-links" role="group" aria-label="LazyingArt app stores"><span>All LazyingArt apps</span>${publisherLinks}</div><div class="work-grid app-grid">${apps.map(card).join('\n')}</div></section>
    ${sections}
    <section class="work-section" id="guides" data-section aria-labelledby="guides-title">
      <div class="work-heading"><h2 id="guides-title">A useful place to start</h2><p>Working through a specific problem? These guides share the checks, trade-offs, and code behind the projects.</p></div>
      <div class="work-grid">${guides.map((guide, i) => `<article class="guide-card" data-guide data-category="guides"><span class="guide-number" aria-hidden="true">0${i + 1}</span><p class="work-kind">From the notebook</p><h3><a href="${escape(guide.url)}">${escape(guide.title)}</a></h3><p>${escape(guide.summary)}</p><a class="guide-link" href="${escape(guide.url)}" aria-label="Read ${escape(guide.title)}">Read the guide <span aria-hidden="true">↗</span></a></article>`).join('')}</div>
    </section>
    <aside class="closing-note"><img src="/logos/panda-v1/logo-256.png" alt="" width="112" height="112" loading="lazy"><div><p class="eyebrow">The art of lazying</p><h2>Less friction.<br>More room to be curious.</h2><p>Ideas, experiments, and the stories behind the tools.</p></div><a class="button primary" href="https://blog.lazying.art/">From the notebook <span aria-hidden="true">↗</span></a></aside>
  </main>
  <footer class="directory-footer"><span>LazyingArt · Build less. Live more.</span>${publisherLinks}<a href="https://github.com/lachlanchen/lachlanchen/blob/main/projects/sites.md">Website and repository directory</a><a href="../work/">Selected work</a><a href="https://lachlan.lazying.art/">About Lachlan</a></footer>
</body>
</html>
`.replace(/[ \t]+$/gm, '');
const destination = new URL('products/index.html', root);
// Google cross-site submission requires ownership of every included site.
// Both LazyingArt and OnlyIdeas domain properties were verified on 2026-09-21.
const discoveryUrls = [...new Set([canonical, 'https://lazying.art/games/', 'https://platform.lazying.art/', ...catalog.items
  .filter(item => item.id !== 'games' && (new URL(item.url).hostname === 'lazying.art' || new URL(item.url).hostname.endsWith('.lazying.art') || new URL(item.url).hostname === 'ideas.onlyideas.art'))
  .map(item => { const url = new URL(item.url); url.hash = ''; return url.href; })])];
const discovery = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + discoveryUrls.map(url => `  <url><loc>${escape(url)}</loc></url>`).join('\n') + '\n</urlset>\n';
const discoveryPath = new URL('discovery-sitemap.xml', root);
const rendered = openPageLinksInNewTabs(html);
if (process.argv.includes('--check')) {
  assert.equal(fs.readFileSync(destination, 'utf8'), rendered, 'Run node tools/build-product-directory.mjs to regenerate the static page');
  assert.equal(fs.readFileSync(discoveryPath, 'utf8'), discovery, 'Discovery sitemap must match the reviewed public catalogue');
} else {
  fs.writeFileSync(destination, rendered);
  fs.writeFileSync(discoveryPath, discovery);
}
console.log(`Product directory: ${catalog.items.length} reviewed entries`);
