import fs from 'node:fs';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const catalog = JSON.parse(fs.readFileSync(new URL('products/catalog.json', root), 'utf8'));
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const canonical = 'https://lazying.art/products/';
const description = 'Discover LazyingArt apps, multilingual books, learning resources, creative tools, and open-source projects. Try L & N, read a book, or explore a practical workflow.';
assert.equal(new Set(catalog.items.map(item => item.id)).size, catalog.items.length);
for (const item of catalog.items) {
  assert.ok(catalog.groups.some(group => group.id === item.group));
  assert.equal(new URL(item.url).protocol, 'https:');
  if (item.repository) assert.match(item.repository, /^https:\/\/github\.com\/(?:lachlanchen|lazyingart)\/[A-Za-z0-9_.-]+$/);
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
      <div class="link-row"><a href="${escape(item.url)}">${escape(item.action)} <span aria-hidden="true">→</span></a>${item.repository ? `<a class="source-link" href="${escape(item.repository)}">Source: ${escape(item.repository.split('/').at(-1))}</a>` : ''}</div>
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
    <nav class="directory-nav" aria-label="Product categories">${catalog.groups.map(group => `<a href="#${escape(group.id)}">${escape(group.name)}</a>`).join('')}</nav>
    ${sections}
  </main>
  <footer class="directory-footer"><span>LazyingArt · Build less. Live more.</span><a href="https://github.com/lachlanchen/lachlanchen/blob/main/projects/sites.md">Website and repository directory</a><a href="../work/">Selected work</a><a href="https://lachlan.lazying.art/">About Lachlan</a></footer>
</body>
</html>
`;
const destination = new URL('products/index.html', root);
// Google cross-site submission requires ownership of every included site.
// Keep OnlyIdeas separate until its own verified property can receive a sitemap.
const discoveryUrls = [...new Set([canonical, 'https://lazying.art/games/', ...catalog.items
  .filter(item => item.id !== 'games' && (new URL(item.url).hostname === 'lazying.art' || new URL(item.url).hostname.endsWith('.lazying.art')))
  .map(item => item.url)])];
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
