import fs from 'node:fs';
import assert from 'node:assert/strict';

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
        return `<a class="store-button" data-store="${escape(link.store)}" href="${escape(link.url)}" aria-label="${escape(item.name)} on the ${store.name}">${store.icon}<span><strong>${store.name}</strong><small>${store.device}</small></span></a>`;
      }).join('')}</div>` : '';
const canonical = 'https://lazying.art/products/';
const description = 'Discover LazyingArt apps, multilingual books, learning resources, creative tools, and open-source projects. Try L & N, read a book, or explore a practical workflow.';
assert.equal(new Set(catalog.items.map(item => item.id)).size, catalog.items.length);
for (const item of catalog.items) {
  assert.ok(catalog.groups.some(group => group.id === item.group));
  assert.equal(new URL(item.url).protocol, 'https:');
  if (item.repository) assert.match(item.repository, /^https:\/\/github\.com\/(?:lachlanchen|lazyingart)\/[A-Za-z0-9_.-]+$/);
  if (item.storeLinks) {
    assert.ok(Array.isArray(item.storeLinks));
    assert.equal(new Set(item.storeLinks.map(link => link.store)).size, item.storeLinks.length);
    for (const link of item.storeLinks) {
      assert.ok(Object.hasOwn(stores, link.store), 'Use a supported public app store');
      const url = new URL(link.url);
      assert.equal(url.protocol, 'https:');
      assert.equal(url.hostname, stores[link.store].host);
      assert.equal(url.username + url.password + url.port + url.hash, '');
      if (link.store === 'app-store') {
        assert.match(url.pathname, /^\/(?:[a-z]{2}\/)?app\/[^/]+\/id\d+$/);
        assert.equal(url.search, '');
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
const sections = catalog.groups.map(group => `<section class="work-section" id="${escape(group.id)}" aria-labelledby="${escape(group.id)}-title">
  <div class="work-heading"><h2 id="${escape(group.id)}-title">${escape(group.name)}</h2><p>${escape(group.intro)}</p></div>
  <div class="work-grid">${catalog.items.filter(item => item.group === group.id).map(item => `
    <article id="${escape(item.id)}"${item.featured ? ' class="featured"' : ''}>
      <p class="work-kind">${escape(item.kind)}</p>
      <h3>${escape(item.name)}</h3>
      <p>${escape(item.description)}</p>
      <div class="link-row"><a href="${escape(item.url)}">${escape(item.action)} <span aria-hidden="true">→</span></a>${item.repository ? `<a class="source-link" href="${escape(item.repository)}">Source: ${escape(item.repository.split('/').at(-1))}</a>` : ''}</div>${storeLinks(item)}
    </article>`).join('')}
  </div>
</section>`).join('\n');
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#17231f">
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
  <link rel="stylesheet" href="styles.css">
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to products</a>
  <header class="site-header">
    <a class="brand" href="../"><img src="../logos/logo.svg" alt="" width="42" height="42"><span><strong>LazyingArt</strong><small>Apps, books &amp; tools</small></span></a>
    <nav aria-label="Primary navigation"><a href="../">Home</a><a href="../work/">Selected work</a><a href="../work/#services">Work with us</a><a href="https://blog.lazying.art/">Blog</a></nav>
  </header>
  <main id="main">
    <section class="hero directory-hero">
      <div><p class="eyebrow">Small tools. Useful work.</p><h1>Find something<br><em>you can use.</em></h1><p class="lead">A few minutes of pronunciation practice. A book with room for another language. A tool that makes the next bit of work easier. Explore what we’re building at LazyingArt.</p><div class="hero-actions"><a class="button primary" href="https://l-and-n.lazying.art/">Try L &amp; N</a><a class="button secondary" href="#learn">Browse the library</a></div></div>
      <aside class="directory-note"><p class="eyebrow">Need help with a project?</p><h2>Start with one clear problem.</h2><p>Our service pages show a sample, a bounded scope, and a free fit check before any payment.</p><a href="../work/#services">Explore the services →</a></aside>
    </section>
    <nav class="directory-nav" aria-label="Product categories"><a href="#guides">Practical guides</a>${catalog.groups.map(group => `<a href="#${escape(group.id)}">${escape(group.name)}</a>`).join('')}</nav>
    <section class="work-section" id="guides" aria-labelledby="guides-title">
      <div class="work-heading"><h2 id="guides-title">A useful place to start</h2><p>Working through a specific problem? These guides share the checks, trade-offs, and code behind the projects.</p></div>
      <div class="work-grid">${guides.map(guide => `<article><p class="work-kind">Practical guide</p><h3><a href="${escape(guide.url)}">${escape(guide.title)}</a></h3><p>${escape(guide.summary)}</p></article>`).join('')}</div>
    </section>
    ${sections}
  </main>
  <footer class="directory-footer"><span>LazyingArt · Build less. Live more.</span><a href="https://github.com/lachlanchen/lachlanchen/blob/main/projects/sites.md">Website and repository directory</a><a href="../work/">Selected work</a><a href="https://lachlan.lazying.art/">About Lachlan</a></footer>
</body>
</html>
`;
const destination = new URL('products/index.html', root);
// Google cross-site submission requires ownership of every included site.
// Both LazyingArt and OnlyIdeas domain properties were verified on 2026-09-21.
const discoveryUrls = [...new Set([canonical, 'https://lazying.art/games/', ...catalog.items
  .filter(item => item.id !== 'games' && (new URL(item.url).hostname === 'lazying.art' || new URL(item.url).hostname.endsWith('.lazying.art') || new URL(item.url).hostname === 'ideas.onlyideas.art'))
  .map(item => { const url = new URL(item.url); url.hash = ''; return url.href; })])];
const discovery = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + discoveryUrls.map(url => `  <url><loc>${escape(url)}</loc></url>`).join('\n') + '\n</urlset>\n';
const discoveryPath = new URL('discovery-sitemap.xml', root);
if (process.argv.includes('--check')) {
  assert.equal(fs.readFileSync(destination, 'utf8'), html, 'Run node tools/build-product-directory.mjs to regenerate the static page');
  assert.equal(fs.readFileSync(discoveryPath, 'utf8'), discovery, 'Discovery sitemap must match the reviewed public catalogue');
} else {
  fs.writeFileSync(destination, html);
  fs.writeFileSync(discoveryPath, discovery);
}
console.log(`Product directory: ${catalog.items.length} reviewed entries`);
