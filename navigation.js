/* One responsive navigation: preserve links, expose state, keep anchors clear. */
(() => {
  const header = document.getElementById('navbar');
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!header || !toggle || !links) return;

  const compact = window.matchMedia('(max-width: 968px)');
  const setOpen = (open, restoreFocus = false) => {
    const expanded = open && compact.matches;
    links.classList.toggle('active', expanded);
    toggle.setAttribute('aria-expanded', String(expanded));
    if (restoreFocus && compact.matches) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  links.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    setOpen(false);
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setOpen(false, true);
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('focusin', (event) => {
    // Inspect the new focus target, not the transient body during focusout.
    if (!header.contains(event.target)) setOpen(false);
  });
  compact.addEventListener('change', () => setOpen(false));

  const measureHeader = () => {
    document.documentElement.style.setProperty(
      '--nav-height', `${Math.ceil(header.getBoundingClientRect().height)}px`,
    );
  };
  document.documentElement.classList.add('nav-ready');
  measureHeader();
  if ('ResizeObserver' in window) {
    new ResizeObserver(measureHeader).observe(header);
  } else {
    window.addEventListener('resize', measureHeader);
    document.getElementById('langSelect')?.addEventListener('change', measureHeader);
  }
})();
