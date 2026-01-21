import { BaseListManager } from './base/baseListManager.js';
import { KeywordMixin } from './base/keywordMixin.js';

export class Experience extends KeywordMixin(BaseListManager) {
  constructor() {
    super('experienceList', 'experienceAdd');
  }

  createItemHTML(index) {
    return `
      <label for="experienceList-title-${index}">CARGO</label>
      <input id="experienceList-title-${index}" class="title" placeholder="Cargo" aria-label="Cargo" />
      <label for="experienceList-company-${index}">EMPRESA</label>
      <input id="experienceList-company-${index}" class="company" placeholder="Empresa" aria-label="Empresa" />
      <label for="experienceList-startsAt-${index}">DATA DE INÍCIO</label>
      <input type="date" id="experienceList-startsAt-${index}" class="startsAt" aria-label="Data de início" />
      <label for="experienceList-endsAt-${index}">DATA DE TÉRMINO</label>
      <input type="date" id="experienceList-endsAt-${index}" class="endsAt" aria-label="Data de término" />
      <div class="form-group">
        <label for="experienceList-currently-${index}">
          <input type="checkbox" id="experienceList-currently-${index}" class="currently" />
          Trabalha Atualmente?
        </label>
      </div>
      <label for="experienceList-description-${index}">DESCRIÇÃO</label>
      <textarea id="experienceList-description-${index}" class="description" placeholder="Descrição" aria-label="Descrição das atividades"></textarea>
    `;
  }

  setupItemBehavior(item, index) {
    const { keywordsSub } = this.createKeywordsSection(item, index, 'Palavras-chave');

    const currentlyCheckbox = item.querySelector(`#experienceList-currently-${index}`);
    const endsAtInput = item.querySelector('.endsAt');

    currentlyCheckbox?.addEventListener('change', (event) => {
      if (endsAtInput) {
        endsAtInput.style.display = event.target.checked ? 'none' : 'block';
      }
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
    return 'Item de experiência profissional';
  }

  getRemoveAriaLabel() {
    return 'Remover experiência';
  }
}
