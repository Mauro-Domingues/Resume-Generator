export class KeywordManager {
  static setupKeywordContainer(containerId, addBtnId) {
    const container = document.querySelector(`#${containerId}`);
    const addBtn = document.querySelector(`#${addBtnId}`);

    addBtn?.addEventListener('click', (event) => {
      event.preventDefault();
      container?.appendChild(this.createKeywordElement());
    });
  }

  static createKeywordElement() {
    const div = document.createElement('div');
    div.className = 'keyword-tag';
    div.innerHTML = `
      <input class="keyword-input" type="text" placeholder="Keyword"/>
      <button type="button" class="keyword-remove"></button>
    `;
    div.querySelector('.keyword-remove').addEventListener('click', () => div.remove());
    return div;
  }

  static getKeywordsFromContainer(containerId) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) return [];
    return Array.from(container.querySelectorAll('.keyword-input'))
      .map(input => input.value.trim())
      .filter(Boolean);
  }

  static getKeywordsFromItem(item) {
    const keywordsSub = item.querySelector('.keywords-sub');
    if (!keywordsSub) return [];
    return Array.from(keywordsSub.querySelectorAll('.keyword-input'))
      .map(input => input.value.trim())
      .filter(Boolean);
  }
}
