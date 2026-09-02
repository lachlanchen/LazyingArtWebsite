(() => {
  "use strict";

  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  const source = new URL(window.location.href);
  const attribution = new Map();

  keys.forEach((key) => {
    const value = source.searchParams.get(key) || "";
    if (/^[A-Za-z0-9._/-]{1,80}$/.test(value)) {
      attribution.set(key, value);
    }
  });

  if (!attribution.size) return;

  document.querySelectorAll("a[href]").forEach((link) => {
    let target;
    try {
      target = new URL(link.href, source);
    } catch (_error) {
      return;
    }
    if (
      target.origin !== source.origin ||
      !/^\/lecture-pack\/fit-check\/?$/.test(target.pathname)
    ) {
      return;
    }
    attribution.forEach((value, key) => target.searchParams.set(key, value));
    link.href = target.toString();
  });
})();
