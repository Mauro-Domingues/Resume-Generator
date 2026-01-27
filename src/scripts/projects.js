import { BaseListManager } from './base/baseListManager.js';
import { KeywordMixin } from './base/keywordMixin.js';

export class Project extends KeywordMixin(BaseListManager) {
  constructor() {
    super('projectsList', 'projectsAdd');
  }

  createItemHTML(index) {
    return `
      <label for="projectsList-title-${index}">TÍTULO</label>
      <input id="projectsList-title-${index}" class="title" placeholder="Título" aria-label="Título do projeto" />
      <label for="projectsList-description-${index}">DESCRIÇÃO</label>
      <textarea id="projectsList-description-${index}" class="description" placeholder="Descrição" aria-label="Descrição do projeto"></textarea>
      <div class="image-input-wrapper">
        <label for="projectsList-banner-${index}">BANNER DO PROJETO</label>
        <input type="file" id="projectsList-banner-${index}" class="banner" accept="image/*" data-base64="" aria-label="Banner do projeto" />
        <button type="button" class="banner-remove remove" aria-label="Remover banner"></button>
      </div>
      <label for="projectsList-linkValue-${index}">TEXTO DO LINK</label>
      <input id="projectsList-linkValue-${index}" class="link-value" placeholder="Display Link" aria-label="Texto do link" />
      <label for="projectsList-linkRef-${index}">URL DO LINK</label>
      <input id="projectsList-linkRef-${index}" class="link-ref" placeholder="Link URL" aria-label="URL do link" />
    `;
  }

  setupItemBehavior(item, index) {
    const { keywordsSub } = this.createKeywordsSection(
      item,
      index,
      'Palavras-chave',
    );

    const bannerInput = item.querySelector('.banner');
    const clearBtn = item.querySelector('.banner-remove');

    bannerInput?.addEventListener('change', event => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          bannerInput.dataset.base64 = e.target?.result || '';
        };
        reader.readAsDataURL(file);
      }
    });

    clearBtn?.addEventListener('click', event => {
      event.preventDefault();
      if (bannerInput) {
        bannerInput.value = '';
        bannerInput.dataset.base64 = '';
      }
    });

    item._keywordsSub = keywordsSub;
  }

  populateItem(item, index, data) {
    const setInputValue = (selector, value) => {
      if (value !== undefined) {
        const el = item.querySelector(selector);
        if (el) el.value = value;
      }
    };

    setInputValue('.title', data.title);
    setInputValue('.description', data.description);
    setInputValue('.link-value', data.link?.value);
    setInputValue('.link-ref', data.link?.ref);

    if (data.banner) {
      const bannerInput = item.querySelector('.banner');
      if (bannerInput) {
        bannerInput.dataset.base64 = data.banner;
      }
    }

    if (item._keywordsSub && data.keywords) {
      this.populateKeywords(item._keywordsSub, index, data.keywords);
    }
  }

  getItemAriaLabel() {
    return 'Item de projeto';
  }

  getRemoveAriaLabel() {
    return 'Remover projeto';
  }
}
