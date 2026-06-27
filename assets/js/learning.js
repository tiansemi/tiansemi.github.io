(() => {
  const codeBlocks = document.querySelectorAll('.learning-code');

  codeBlocks.forEach((block, index) => {
    if (!block.hasAttribute('role')) {
      block.setAttribute('role', 'region');
    }

    if (!block.hasAttribute('aria-label')) {
      block.setAttribute('aria-label', `Bloc de code ${index + 1}`);
    }

    block.setAttribute('tabindex', '0');

    const wrapper = document.createElement('div');
    wrapper.className = 'learning-code-block';

    const toolbar = document.createElement('div');
    toolbar.className = 'learning-code-block__toolbar';

    const label = document.createElement('span');
    label.className = 'learning-code-block__label';
    label.textContent = block.getAttribute('data-code-label') || 'Exemple technique';

    const button = document.createElement('button');
    button.className = 'learning-code-copy';
    button.type = 'button';
    button.textContent = 'Copier';
    button.setAttribute('aria-label', `Copier le contenu du bloc de code ${index + 1}`);

    toolbar.append(label, button);

    block.parentNode.insertBefore(wrapper, block);
    wrapper.append(toolbar, block);

    button.addEventListener('click', async () => {
      const code = block.textContent.trim();

      try {
        await navigator.clipboard.writeText(code);
        button.textContent = 'Copié';
        button.dataset.state = 'success';
      } catch (error) {
        button.textContent = 'Copie impossible';
        button.dataset.state = 'error';
      }

      window.setTimeout(() => {
        button.textContent = 'Copier';
        delete button.dataset.state;
      }, 2200);
    });
  });
})();
