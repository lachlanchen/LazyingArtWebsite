/* Native scrolling, real cards, no cloned IDs or duplicated purchase links. */
(() => {
  const strings = {
    en: { title: 'Find your next favourite app.', previous: 'Previous apps', next: 'Next apps', on: 'Autoplay on', off: 'Autoplay off', cards: 'App cards', shortcuts: 'Explore LazyingArt apps' },
    ja: { title: '次のお気に入りアプリを。', previous: '前のアプリ', next: '次のアプリ', on: '自動再生オン', off: '自動再生オフ', cards: 'アプリ一覧', shortcuts: 'LazyingArtのアプリを見る' },
    'zh-Hans': { title: '找到下一款喜欢的应用。', previous: '上一组应用', next: '下一组应用', on: '自动轮播已开启', off: '自动轮播已关闭', cards: '应用卡片', shortcuts: '探索 LazyingArt 应用' },
    'zh-Hant': { title: '找到下一款喜歡的應用。', previous: '上一組應用', next: '下一組應用', on: '自動輪播已開啟', off: '自動輪播已關閉', cards: '應用卡片', shortcuts: '探索 LazyingArt 應用' },
    ko: { title: '다음 즐겨찾기 앱을 만나보세요.', previous: '이전 앱', next: '다음 앱', on: '자동 재생 켜짐', off: '자동 재생 꺼짐', cards: '앱 카드', shortcuts: 'LazyingArt 앱 둘러보기' },
    ar: { title: 'اكتشف تطبيقك المفضّل التالي.', previous: 'التطبيقات السابقة', next: 'التطبيقات التالية', on: 'التشغيل التلقائي مفعّل', off: 'التشغيل التلقائي متوقف', cards: 'بطاقات التطبيقات', shortcuts: 'استكشف تطبيقات LazyingArt' },
    vi: { title: 'Tìm ứng dụng yêu thích tiếp theo.', previous: 'Ứng dụng trước', next: 'Ứng dụng tiếp theo', on: 'Tự động phát đang bật', off: 'Tự động phát đang tắt', cards: 'Thẻ ứng dụng', shortcuts: 'Khám phá ứng dụng LazyingArt' },
    fr: { title: 'Votre prochaine appli préférée.', previous: 'Applis précédentes', next: 'Applis suivantes', on: 'Défilement auto activé', off: 'Défilement auto désactivé', cards: 'Cartes des applis', shortcuts: 'Découvrir les applis LazyingArt' },
    es: { title: 'Encuentra tu próxima app favorita.', previous: 'Apps anteriores', next: 'Apps siguientes', on: 'Avance automático activado', off: 'Avance automático desactivado', cards: 'Tarjetas de apps', shortcuts: 'Explora las apps de LazyingArt' },
    pt: { title: 'Encontre seu próximo app favorito.', previous: 'Apps anteriores', next: 'Próximos apps', on: 'Avanço automático ativado', off: 'Avanço automático desativado', cards: 'Cartões de apps', shortcuts: 'Explore os apps da LazyingArt' },
    de: { title: 'Entdecke deine nächste Lieblings-App.', previous: 'Vorherige Apps', next: 'Nächste Apps', on: 'Automatischer Wechsel an', off: 'Automatischer Wechsel aus', cards: 'App-Karten', shortcuts: 'LazyingArt-Apps entdecken' },
    ru: { title: 'Найдите новое любимое приложение.', previous: 'Предыдущие приложения', next: 'Следующие приложения', on: 'Автопрокрутка включена', off: 'Автопрокрутка выключена', cards: 'Карточки приложений', shortcuts: 'Приложения LazyingArt' },
    tr: { title: 'Yeni favori uygulamanızı bulun.', previous: 'Önceki uygulamalar', next: 'Sonraki uygulamalar', on: 'Otomatik geçiş açık', off: 'Otomatik geçiş kapalı', cards: 'Uygulama kartları', shortcuts: 'LazyingArt uygulamalarını keşfedin' },
  };
  const canAutoplay = ({ enabled, visible, hidden, hovered, focused, dragging, busy, overflow }) =>
    enabled && visible && !hidden && !hovered && !focused && !dragging && !busy && overflow;
  if (typeof module !== 'undefined' && module.exports) module.exports = { strings, canAutoplay };
  if (typeof document === 'undefined') return;

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const storageKey = 'lazyingart-app-autoplay';
  const dictionary = () => strings[document.getElementById('langSelect')?.value] || strings[document.documentElement.lang] || strings.en;
  const instances = [];

  for (const root of document.querySelectorAll('[data-app-reel]')) {
    const track = root.querySelector('[data-reel-track]');
    if (!track || track.children.length < 2) continue;
    const loop = root.hasAttribute('data-reel-loop');
    const previous = root.querySelector('[data-reel-prev]');
    const next = root.querySelector('[data-reel-next]');
    const auto = root.querySelector('[data-reel-auto]');
    const controls = root.querySelector('.app-reel-controls, .app-shortcut-controls');
    let enabled = !!auto && !motion.matches;
    try { if (localStorage.getItem(storageKey) === 'off') enabled = false; } catch (_) { /* private browsing */ }
    let timer, settleTimer, finishTimer;
    let hovered = false, dragging = false, busy = false, visible = false, normalizing = false;
    let manualMotionChoice = false;
    const overflow = () => track.scrollWidth > track.clientWidth + 2;
    const step = () => {
      const cards = [...track.children];
      return Math.abs(cards[1].offsetLeft - cards[0].offsetLeft);
    };
    const stop = () => { clearTimeout(timer); timer = undefined; };
    const updateLabels = () => {
      const dict = dictionary();
      if (auto) {
        auto.setAttribute('aria-pressed', String(enabled));
        auto.querySelector('[data-auto-label]').textContent = enabled ? dict.on : dict.off;
        auto.querySelector('[data-auto-icon]').textContent = enabled ? 'Ⅱ' : '▶';
      }
      root.querySelectorAll('[data-app-label]').forEach(el => { el.textContent = dict[el.dataset.appLabel]; });
      root.querySelectorAll('[data-app-aria]').forEach(el => { el.setAttribute('aria-label', dict[el.dataset.appAria]); });
    };
    const update = () => {
      const scrollable = overflow();
      if (controls) controls.hidden = !scrollable;
      previous.disabled = !scrollable || (!loop && track.scrollLeft <= 2);
      next.disabled = !scrollable || (!loop && track.scrollLeft >= track.scrollWidth - track.clientWidth - 2);
      root.dataset.autoplay = enabled ? 'on' : 'off';
      updateLabels();
      stop();
      if (canAutoplay({ enabled, visible, hidden:document.hidden, hovered,
        focused:root.contains(document.activeElement), dragging, busy, overflow:scrollable })) {
        timer = setTimeout(() => move(1), 4800);
      }
    };
    const normalize = () => {
      const focusedCard = document.activeElement !== track && track.contains(document.activeElement);
      if (!loop || normalizing || dragging || focusedCard || !overflow()) return;
      normalizing = true;
      // Move actual offscreen cards to the tail and compensate their width.
      // Every visible card keeps its position, ID and working store buttons.
      for (let i = 0; i < track.children.length; i++) {
        const distance = step();
        if (!distance || track.scrollLeft < distance - 1) break;
        const offset = track.scrollLeft;
        track.append(track.firstElementChild);
        track.scrollLeft = offset - distance;
      }
      normalizing = false;
    };
    const finish = () => {
      clearTimeout(finishTimer);
      busy = false;
      root.dataset.reelMoving = 'false';
      normalize();
      update();
    };
    const move = (direction) => {
      if (!overflow() || busy) return;
      stop();
      normalize();
      const distance = step();
      if (loop && direction < 0 && track.scrollLeft < distance) {
        const offset = track.scrollLeft;
        const last = track.lastElementChild;
        track.prepend(last);
        track.scrollLeft = offset + step();
      }
      busy = true;
      root.dataset.reelMoving = 'true';
      track.scrollTo({ left:track.scrollLeft + direction * distance, behavior:motion.matches ? 'instant' : 'smooth' });
      clearTimeout(finishTimer);
      finishTimer = setTimeout(finish, 1000);
    };
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('scroll', () => {
      stop();
      clearTimeout(settleTimer);
      settleTimer = setTimeout(finish, 150);
    }, { passive:true });
    track.addEventListener('keydown', event => {
      if (event.target !== track || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    });
    root.addEventListener('mouseenter', () => { hovered = true; update(); });
    root.addEventListener('mouseleave', () => { hovered = false; update(); });
    root.addEventListener('focusin', update);
    root.addEventListener('focusout', () => queueMicrotask(update));
    track.addEventListener('pointerdown', () => { dragging = true; stop(); });
    window.addEventListener('pointerup', () => { if (dragging) { dragging = false; finish(); } });
    window.addEventListener('pointercancel', () => { if (dragging) { dragging = false; finish(); } });
    if (auto) auto.addEventListener('click', () => {
      enabled = !enabled;
      manualMotionChoice = true;
      try { localStorage.setItem(storageKey, enabled ? 'on' : 'off'); } catch (_) { /* optional preference */ }
      if (!enabled) {
        track.scrollTo({ left:track.scrollLeft, behavior:'instant' });
        finish();
      }
      update();
    });
    motion.addEventListener('change', () => {
      if (motion.matches || !manualMotionChoice) enabled = !!auto && !motion.matches;
      if (motion.matches) {
        track.scrollTo({ left:track.scrollLeft, behavior:'instant' });
        finish();
      }
      // A previously saved off preference always wins over the system default.
      try { if (localStorage.getItem(storageKey) === 'off') enabled = false; } catch (_) { /* optional preference */ }
      update();
    });
    document.addEventListener('visibilitychange', update);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }, { threshold:0.15 }).observe(track);
    } else visible = true;
    if ('ResizeObserver' in window) new ResizeObserver(() => { normalize(); update(); }).observe(track);
    else window.addEventListener('resize', () => { normalize(); update(); });
    track.dataset.reelReady = '';
    update();
    instances.push({ root, track, update, reveal(target) {
      const card = [...track.children].find(el => el.contains(target));
      if (!card) return false;
      stop();
      clearTimeout(settleTimer);
      clearTimeout(finishTimer);
      busy = false;
      root.dataset.reelMoving = 'false';
      track.scrollTo({ left:track.scrollLeft, behavior:'instant' });
      while (track.firstElementChild !== card) track.append(track.firstElementChild);
      track.scrollLeft = 0;
      root.scrollIntoView({ block:'start', behavior:motion.matches ? 'instant' : 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll:true });
      update();
      return true;
    } });
  }
  const updateAll = () => instances.forEach(reel => reel.update());
  new MutationObserver(updateAll).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
  document.getElementById('langSelect')?.addEventListener('change', updateAll);
  // Capture before the site's generic smooth-scroll anchor handler. Otherwise
  // a shortcut could scroll to a card that is still outside the horizontal view.
  document.addEventListener('click', event => {
    const link = event.target.closest('.app-shelf a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.getAttribute('href').slice(1));
    const reel = instances.find(item => item.root.hasAttribute('data-reel-loop') && item.track.contains(target));
    if (target && reel) {
      event.preventDefault();
      event.stopPropagation();
      reel.reveal(target);
    }
  }, true);
})();
