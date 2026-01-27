export class KeywordManager {
  static setupKeywordContainer(containerId, addBtnId) {
    const container = document.querySelector(`#${containerId}`);
    const addBtn = document.querySelector(`#${addBtnId}`);

    addBtn?.addEventListener('click', event => {
      event.preventDefault();
      this.#addKeyword(container);
    });
  }

  static init(containerId, keywords = []) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) return;

    keywords.forEach(keyword => this.#addKeyword(container, keyword));
  }

  static #addKeyword(container, value = '') {
    const index = container?.children.length || 0;
    const kwDiv = document.createElement('li');
    kwDiv.className = 'keyword-tag';
    kwDiv.setAttribute('aria-label', 'Palavra-chave');

    const input = document.createElement('input');
    input.className = 'keyword-input';
    input.type = 'text';
    input.placeholder = 'palavra-chave';
    input.id = `${container.id}-keyword-input-${index}`;
    input.setAttribute('aria-label', 'Texto da palavra-chave');
    if (value) input.value = value;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'keyword-remove';
    removeBtn.setAttribute('aria-label', 'Remover palavra-chave');
    removeBtn.addEventListener('click', () => kwDiv.remove());

    kwDiv.appendChild(input);
    kwDiv.appendChild(removeBtn);
    container?.appendChild(kwDiv);
  }

  static getKeywordsFromContainer(containerId) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) return [];

    return Array.from(container.querySelectorAll('.keyword-input'))
      .map(input => input.value.trim())
      .filter(Boolean);
  }

  static getKeywordsFromItem(item) {
    const keywordsSub = item?.querySelector('.keywords-sub');
    if (!keywordsSub) return [];

    return Array.from(keywordsSub.querySelectorAll('.keyword-input'))
      .map(input => input.value.trim())
      .filter(Boolean);
  }
}
