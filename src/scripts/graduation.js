import { BaseListManager } from './base/BaseListManager.js';
import { KeywordMixin } from './base/KeywordMixin.js';

export class Graduation extends KeywordMixin(BaseListManager) {
  constructor() {
    super('graduationList', 'graduationAdd');
  }

  createItemHTML(index) {
    return `
      <label for="graduationList-title-${index}">TÍTULO</label>
      <input id="graduationList-title-${index}" class="title" placeholder="Título" aria-label="Título do curso" />
      <label for="graduationList-institution-${index}">INSTITUIÇÃO</label>
      <input id="graduationList-institution-${index}" class="institution" placeholder="Instituição" aria-label="Nome da instituição" />
      <label for="graduationList-startsAt-${index}">DATA DE INÍCIO</label>
      <input type="date" id="graduationList-startsAt-${index}" class="startsAt" placeholder="Início" aria-label="Data de início" />
      <label for="graduationList-endsAt-${index}">DATA DE TÉRMINO</label>
      <input type="date" id="graduationList-endsAt-${index}" class="endsAt" placeholder="Fim" aria-label="Data de término" />
      <div class="form-group">
        <label for="graduationList-currently-${index}">
          <input type="checkbox" id="graduationList-currently-${index}" class="currently" />
          Cursa Atualmente?
        </label>
      </div>
      <label for="graduationList-description-${index}">DESCRIÇÃO</label>
      <textarea id="graduationList-description-${index}" class="description" placeholder="Descrição" aria-label="Descrição do curso"></textarea>
    `;
  }

  setupItemBehavior(item, index) {
    const { keywordsSub } = this.createKeywordsSection(item, index, 'Palavras-chave');

    const currentlyCheckbox = item.querySelector(`#graduationList-currently-${index}`);
    const endsAtInput = item.querySelector('.endsAt');

    currentlyCheckbox?.addEventListener('change', (event) => {
      endsAtInput.style.display = event.target?.checked ? 'none' : 'block';
    });

    item._keywordsSub = keywordsSub;
  }

  populateItem(item, index, data) {
    super.populateItem(item, index, data);

    const currentlyCheckbox = item.querySelector('.currently');
    if (currentlyCheckbox && data.currently !== undefined) {
      currentlyCheckbox.checked = data.currently;
      currentlyCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    }

    if (item._keywordsSub && data.keywords) {
      this.populateKeywords(item._keywordsSub, index, data.keywords);
    }
  }

  getItemAriaLabel() {
    return 'Item de escolaridade';
  }

  getRemoveAriaLabel() {
    return 'Remover escolaridade';
  }
}