(() => {
  const filters = document.querySelectorAll('[data-blog-filter]');
  const cards = Array.from(document.querySelectorAll('[data-blog-card]'));
  const moreButton = document.querySelector('[data-blog-more]');
  const emptyState = document.querySelector('[data-blog-empty]');
  const pageSize = 9;
  let activeCategory = 'all';
  let visibleLimit = pageSize;

  function getFilteredCards() {
    if (activeCategory === 'all') {
      return cards;
    }

    return cards.filter((card) => card.dataset.category === activeCategory);
  }

  function renderCards() {
    const filteredCards = getFilteredCards();

    cards.forEach((card) => {
      card.hidden = true;
    });

    filteredCards.slice(0, visibleLimit).forEach((card) => {
      card.hidden = false;
    });

    if (emptyState) {
      emptyState.hidden = filteredCards.length > 0;
    }

    if (moreButton) {
      moreButton.hidden = filteredCards.length <= visibleLimit;
    }
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.blogFilter;
      visibleLimit = pageSize;

      filters.forEach((filter) => {
        const isActive = filter === button;
        filter.classList.toggle('is-active', isActive);
        filter.setAttribute('aria-pressed', String(isActive));
      });

      renderCards();
    });
  });

  if (moreButton) {
    moreButton.addEventListener('click', () => {
      visibleLimit += pageSize;
      renderCards();
    });
  }

  renderCards();
})();
