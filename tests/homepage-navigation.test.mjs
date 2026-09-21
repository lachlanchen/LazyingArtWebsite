import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = fs.readFileSync(new URL('../navigation.js', import.meta.url), 'utf8');

function element() {
  const attributes = new Map();
  const classes = new Set();
  const listeners = {};
  return {
    listeners, classes, focused: false,
    addEventListener: (name, callback) => { listeners[name] = callback; },
    getAttribute: (name) => attributes.get(name) ?? null,
    setAttribute: (name, value) => attributes.set(name, value),
    hasAttribute: (name) => attributes.has(name),
    classList: {
      add: (name) => classes.add(name),
      toggle: (name, on) => on ? classes.add(name) : classes.delete(name),
    },
    focus() { this.focused = true; },
    getBoundingClientRect: () => ({ height: 143.2 }),
  };
}

function setup({ compact = true, observer = true, missing = false } = {}) {
  const nodes = Object.fromEntries(['navbar', 'menuToggle', 'navLinks', 'langSelect', 'services']
    .map((id) => [id, element()]));
  nodes.menuToggle.setAttribute('aria-expanded', 'false');
  nodes.navbar.contains = (target) => [nodes.navbar, nodes.menuToggle, nodes.navLinks].includes(target);
  const document = element();
  document.getElementById = (id) => missing ? null : nodes[id];
  document.documentElement = element();
  const styles = new Map();
  document.documentElement.style = { setProperty: (name, value) => styles.set(name, value) };
  const media = { ...element(), matches: compact };
  const window = { ...element(), matchMedia: () => media };
  let resize;
  class ResizeObserver {
    constructor(callback) { resize = callback; }
    observe(node) { assert.equal(node, nodes.navbar); }
  }
  if (observer) window.ResizeObserver = ResizeObserver;
  vm.runInNewContext(script, {
    document, window, ResizeObserver,
  });
  return { nodes, document, media, window, styles, resize };
}

test('navigation retains available destinations and labels its disclosure in every locale', () => {
  const nav = html.match(/<div class="nav-links" id="navLinks">([\s\S]*?)<\/div>/)[1];
  const hrefs = [...nav.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(hrefs, ['#services', 'work/', 'products/', '#ecosystem', '#product',
    'https://onlyideas.art', '#babelglass', 'eink/', 'lkt/', 'lecture-pack/',
    '#company', '#contact', 'https://chat.lazying.art']);
  assert.match(html, /id="menuToggle" type="button" aria-controls="navLinks" aria-expanded="false" aria-labelledby="menuLabel"/);
  assert.match(html, /id="menuLabel" class="visually-hidden" data-i18n="nav_menu"/);
  assert.ok(html.indexOf('id="menuToggle"') < html.indexOf('id="navLinks"'), 'disclosure precedes controlled links in keyboard order');
  const dictionaries = html.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/)[1];
  const translations = vm.runInNewContext(`(${dictionaries})`);
  assert.equal(Object.keys(translations).length, 13);
  for (const [language, dictionary] of Object.entries(translations)) {
    assert.ok(dictionary.nav_menu?.trim(), `${language} has an accessible menu label`);
  }
  assert.match(html, /<script src="navigation\.js"><\/script>/);
  assert.doesNotMatch(html, /navLinks\.classList\.toggle\('active'\)/);
});

test('compact toggle and Escape keep the visible state and accessible state in sync', () => {
  const { nodes, document } = setup();
  nodes.menuToggle.listeners.click();
  assert.equal(nodes.menuToggle.getAttribute('aria-expanded'), 'true');
  assert.ok(nodes.navLinks.classes.has('active'));
  let prevented = false;
  document.listeners.keydown({ key: 'Escape', preventDefault: () => { prevented = true; } });
  assert.ok(prevented);
  assert.equal(nodes.menuToggle.getAttribute('aria-expanded'), 'false');
  assert.ok(!nodes.navLinks.classes.has('active'));
  assert.ok(nodes.menuToggle.focused);
});

test('short-screen menu starts at the first link and scrolls without shrinking links', () => {
  const compactMenu = html.match(/\.nav-ready \.nav-links \{([^}]+)\}/)[1];
  assert.match(compactMenu, /flex-direction: column/);
  assert.match(compactMenu, /justify-content: flex-start/);
  assert.match(compactMenu, /flex-wrap: nowrap/);
  assert.match(compactMenu, /max-height: calc\(100dvh - var\(--nav-height, 160px\)\)/);
  assert.match(compactMenu, /overflow-y: auto/);
  assert.match(html, /\.nav-ready \.nav-links a \{[^}]*flex-shrink: 0/);
});

test('unrelated keys and a closed Escape do not capture focus', () => {
  const { nodes, document } = setup();
  const unexpected = () => assert.fail('key should not be intercepted');
  document.listeners.keydown({ key: 'Escape', preventDefault: unexpected });
  nodes.menuToggle.listeners.click();
  document.listeners.keydown({ key: 'Enter', preventDefault: unexpected });
  assert.equal(nodes.menuToggle.focused, false);
  assert.equal(nodes.menuToggle.getAttribute('aria-expanded'), 'true');
});

test('section links close the menu and move keyboard focus to their destination', () => {
  const { nodes } = setup();
  nodes.menuToggle.listeners.click();
  const link = element();
  link.setAttribute('href', '#services');
  nodes.navLinks.listeners.click({ target: { closest: () => link } });
  assert.equal(nodes.menuToggle.getAttribute('aria-expanded'), 'false');
  assert.equal(nodes.services.getAttribute('tabindex'), '-1');
  assert.ok(nodes.services.focused);
  nodes.services.setAttribute('tabindex', '0');
  nodes.navLinks.listeners.click({ target: { closest: () => link } });
  assert.equal(nodes.services.getAttribute('tabindex'), '0', 'preserve existing focus semantics');
});

test('outside clicks and tabbing out close the compact menu, internal focus does not', () => {
  const { nodes, document } = setup();
  nodes.menuToggle.listeners.click();
  document.listeners.click({ target: nodes.menuToggle });
  assert.equal(nodes.menuToggle.getAttribute('aria-expanded'), 'true');
  document.listeners.focusin({ target: nodes.navLinks });
  assert.equal(nodes.menuToggle.getAttribute('aria-expanded'), 'true');
  document.listeners.focusin({ target: {} });
  assert.equal(nodes.menuToggle.getAttribute('aria-expanded'), 'false');
  nodes.menuToggle.listeners.click();
  document.listeners.click({ target: {} });
  assert.equal(nodes.menuToggle.getAttribute('aria-expanded'), 'false');
});

test('desktop transition clears stale menu state and observes translated header height', () => {
  const { nodes, document, media, styles, resize } = setup();
  assert.ok(document.documentElement.classes.has('nav-ready'));
  assert.equal(styles.get('--nav-height'), '144px');
  nodes.menuToggle.listeners.click();
  media.matches = false;
  media.listeners.change();
  nodes.menuToggle.listeners.click();
  assert.equal(nodes.menuToggle.getAttribute('aria-expanded'), 'false');
  nodes.navbar.getBoundingClientRect = () => ({ height: 191.4 });
  resize();
  assert.equal(styles.get('--nav-height'), '192px');
});

test('old browsers retain a resize/language fallback and missing markup fails safely', () => {
  const { nodes, window, styles } = setup({ observer: false });
  nodes.navbar.getBoundingClientRect = () => ({ height: 150 });
  window.listeners.resize();
  assert.equal(styles.get('--nav-height'), '150px');
  nodes.navbar.getBoundingClientRect = () => ({ height: 165 });
  nodes.langSelect.listeners.change();
  assert.equal(styles.get('--nav-height'), '165px');
  const missing = setup({ missing: true });
  assert.ok(!missing.document.documentElement.classes.has('nav-ready'));
});
