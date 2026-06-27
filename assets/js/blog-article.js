(() => {
  const article = document.querySelector('[data-article-content]');
  const readingTarget = document.querySelector('[data-reading-time]');

  if (article && readingTarget) {
    const text = article.textContent.trim();
    const words = text ? text.split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    readingTarget.textContent = `${minutes} min de lecture`;
  }

  document.querySelectorAll('pre code').forEach((code, index) => {
    if (window.hljs) {
      window.hljs.highlightElement(code);
    }

    const pre = code.closest('pre');
    if (!pre || pre.closest('.article-code')) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'article-code';

    const toolbar = document.createElement('div');
    toolbar.className = 'article-code__toolbar';

    const label = document.createElement('span');
    label.textContent = code.dataset.label || code.className.replace('language-', '').toUpperCase() || `Code ${index + 1}`;

    const button = document.createElement('button');
    button.className = 'article-copy';
    button.type = 'button';
    button.textContent = 'Copier le code';
    button.setAttribute('aria-label', `Copier le bloc de code ${index + 1}`);

    toolbar.append(label, button);
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.append(toolbar, pre);

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent.trim());
        button.textContent = 'Copié';
        button.dataset.state = 'success';
      } catch (error) {
        button.textContent = 'Copie impossible';
        button.dataset.state = 'error';
      }

      window.setTimeout(() => {
        button.textContent = 'Copier le code';
        delete button.dataset.state;
      }, 2200);
    });
  });
})();
