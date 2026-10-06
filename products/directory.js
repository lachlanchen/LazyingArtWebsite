/* Progressive enhancement only: all products and links exist in the HTML. */
(() => {
  'use strict';
  const motionButton = document.querySelector('[data-motion-toggle]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const storageKey = 'lazyingart-directory-motion';
  let preference = null;
  try { preference = localStorage.getItem(storageKey); } catch { /* Storage is optional. */ }
  const updateMotion = () => {
    const off = reducedMotion.matches || preference === 'off';
    document.documentElement.dataset.motion = off ? 'off' : 'on';
    motionButton.textContent = reducedMotion.matches ? 'Motion: reduced' : `Motion: ${off ? 'off' : 'on'}`;
    motionButton.setAttribute('aria-pressed', String(off));
    motionButton.setAttribute('aria-label', reducedMotion.matches ? 'Animations off: follows your system preference' : `${off ? 'Enable' : 'Pause'} animations`);
    motionButton.disabled = reducedMotion.matches;
  };
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => {
    preference = document.documentElement.dataset.motion === 'on' ? 'off' : 'on';
    try { localStorage.setItem(storageKey, preference); } catch { /* Storage is optional. */ }
    updateMotion();
  });
  reducedMotion.addEventListener('change', updateMotion);
  updateMotion();

  const input = document.querySelector('#product-search');
  const cards = [...document.querySelectorAll('[data-product], [data-guide]')];
  const sections = [...document.querySelectorAll('[data-section]')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const status = document.querySelector('.result-status');
  const empty = document.querySelector('.empty-state');
  const toolbar = document.querySelector('#directory');
  const normalize = value => value.normalize('NFKD').toLowerCase().replace(/\p{M}/gu, '').replace(/[&·]/g, ' ').replace(/\s+/g, ' ').trim();
  const text = new Map(cards.map(card => [card, normalize(card.textContent)]));
  let category = 'all';
  input.closest('label').hidden = false;
  const apply = () => {
    const words = normalize(input.value).split(' ').filter(Boolean);
    let projects = 0;
    let guides = 0;
    for (const card of cards) {
      const inCategory = category === 'all' || (category === 'apps' ? card.hasAttribute('data-app') : card.dataset.category === category);
      card.hidden = !inCategory || !words.every(word => text.get(card).includes(word));
      if (!card.hidden) card.hasAttribute('data-guide') ? guides++ : projects++;
    }
    for (const section of sections) section.hidden = !section.querySelector('[data-product]:not([hidden]), [data-guide]:not([hidden])');
    for (const filter of filters) {
      if (filter.dataset.filter === category) filter.setAttribute('aria-current', 'true');
      else filter.removeAttribute('aria-current');
    }
    empty.hidden = projects + guides > 0;
    status.textContent = category === 'all' && !words.length ? 'Find your app, or wander a little.' : `${projects} ${projects === 1 ? 'project' : 'projects'}${guides ? ` · ${guides} ${guides === 1 ? 'guide' : 'guides'}` : ''}${input.value.trim() ? ` matching “${input.value.trim()}”` : ''}`;
  };
  const reset = () => { category = 'all'; input.value = ''; apply(); };
  input.addEventListener('input', apply);
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); input.value = ''; apply(); }
  });
  for (const filter of filters) filter.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    category = filter.dataset.filter;
    apply();
    toolbar.scrollIntoView({block: 'start'});
  });
  document.querySelector('[data-reset]').addEventListener('click', () => { reset(); input.focus(); });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !event.target.closest('input, textarea, select, [contenteditable]')) {
      event.preventDefault(); input.focus();
    }
  });
  const revealHash = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (target?.matches('[data-product], [data-section]')) {
      reset();
      requestAnimationFrame(() => target.scrollIntoView({behavior: 'instant', block: 'start'}));
    }
  };
  document.querySelectorAll('.directory-hero a[href^="#"]').forEach(link => link.addEventListener('click', reset));
  window.addEventListener('hashchange', revealHash);
  apply();
  revealHash();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        if (document.documentElement.dataset.motion !== 'off') entry.target.classList.add('revealing');
        observer.unobserve(entry.target);
      }
    }, {threshold: 0.08});
    cards.forEach(card => observer.observe(card));
  }
})();
