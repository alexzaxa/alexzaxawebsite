(function () {
  const filterBar = document.querySelector('.filter-bar');
  const buttons = Array.from(document.querySelectorAll('.filter-btn'));
  const items = Array.from(document.querySelectorAll('.menu-card[data-category]'));

  if (!filterBar || buttons.length === 0 || items.length === 0) return;

  function showItem(item) {
    item.hidden = false;
    requestAnimationFrame(() => {
      item.classList.remove('is-filtered-out');
      item.removeAttribute('aria-hidden');
    });
  }

  function hideItem(item) {
    item.classList.add('is-filtered-out');
    item.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => {
      if (item.classList.contains('is-filtered-out')) item.hidden = true;
    }, 210);
  }

  function applyFilter(category) {
    buttons.forEach((button) => {
      const isActive = button.dataset.filter === category;
      button.setAttribute('aria-pressed', String(isActive));
    });

    items.forEach((item) => {
      const matches = category === 'all' || item.dataset.category === category;
      matches ? showItem(item) : hideItem(item);
    });
  }

  filterBar.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement) || !target.dataset.filter) return;
    applyFilter(target.dataset.filter);
  });
})();
