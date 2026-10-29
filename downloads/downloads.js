(() => {
  const input = document.querySelector('#download-search');
  if (!input) return;
  const cards = [...document.querySelectorAll('[data-download-card]')];
  const status = document.querySelector('#download-count');
  const empty = document.querySelector('#download-empty');
  input.closest('label').hidden = false;
  input.addEventListener('input', () => {
    const words = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const card of cards) {
      card.hidden = !words.every(word => card.dataset.search.includes(word));
      if (!card.hidden) count++;
    }
    status.textContent = words.length ? `${count} matching ${count === 1 ? 'app' : 'apps'}` : '';
    empty.hidden = count !== 0;
  });
})();
