/* Enhance a normal link; no automatic redirects, tracking or app-open guesses. */
(() => {
  const ua = navigator.userAgent || '';
  const platform = navigator.userAgentData?.platform || navigator.platform || '';
  // iPadOS can identify as a Mac in its desktop browser mode.
  const ios = /iPad|iPhone|iPod/i.test(ua) || (/Mac/i.test(platform) && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua) || /Android/i.test(platform);
  const destination = android ? 'https://play.google.com/store/apps/details?id=art.lazying.echomind'
    : ios ? 'https://apps.apple.com/app/id6793615455'
      : 'https://chat.lazying.art/';
  document.querySelectorAll('[data-echomind-link]').forEach(link => {
    link.href = destination;
    link.dataset.destination = android ? 'android' : ios ? 'ios' : 'web';
  });
})();
