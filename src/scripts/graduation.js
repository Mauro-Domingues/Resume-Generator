export class Graduation {
  #graduationList;
  #addButton;

  constructor() {
    this.#graduationList = document.querySelector('#graduationList');
    this.#addButton = document.querySelector('#graduationAdd');
    this.#setupEventListeners();
  }

  init(graduations = []) {
    graduations.forEach(grad => this.#addItem(grad));
  }

  #setupEventListeners() {
    this.#addButton?.addEventListener('click', () => this.#addItem());
  }

  #addItem(data = null) {
    const index = this.#graduationList?.children.length || 0;
    const item = document.createElement('li');
    item.className = 'item';
    item.setAttribute('aria-label', 'Item de escolaridade');

    item.innerHTML = `
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
          <input type="checkbox" id="graduationList-currently-${index}" />
          Cursa Atualmente?
        </label>
      </div>
      <label for="graduationList-description-${index}">DESCRIÇÃO</label>
      <textarea id="graduationList-description-${index}" class="description" placeholder="Descrição" aria-label="Descrição do curso"></textarea>
    `;

    const currentlyCheckbox = item.querySelector(`#graduationList-currently-${index}`);
    const endsAtInput = item.querySelector('.endsAt');

    currentlyCheckbox?.addEventListener('change', (event) => {
      endsAtInput.style.display = event.target?.checked ? 'none' : 'block';
    });

    const keywordsSub = document.createElement('li');
    keywordsSub.className = 'keywords-sub';
    keywordsSub.setAttribute('aria-label', 'Palavras-chave da escolaridade');

    const keywordsLabel = document.createElement('h3');
    keywordsLabel.textContent = 'Palavras-chave';
    keywordsSub.appendChild(keywordsLabel);

    item.appendChild(keywordsSub);

    const keywordsAddBtn = document.createElement('button');
    keywordsAddBtn.type = 'button';
    keywordsAddBtn.className = 'keywords-add';
    keywordsAddBtn.textContent = '+ Adicionar palavra-chave';
    keywordsAddBtn.setAttribute('aria-label', '+ Adicionar palavra-chave');
    keywordsAddBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.#addKeyword(keywordsSub, index);
    });

    item.appendChild(keywordsAddBtn);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.setAttribute('aria-label', 'Remover escolaridade');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(removeBtn);

    if (data) {
      this.#populateItem(item, index, data);
    }

    this.#graduationList?.appendChild(item);
  }

  #addKeyword(container, containerIndex, value = '') {
    const index = container?.children.length || 0;
    const kwDiv = document.createElement('li');
    kwDiv.className = 'keyword-tag-inline';
    kwDiv.setAttribute('aria-label', 'Palavra-chave');

    const input = document.createElement('input');
    input.className = 'keyword-input';
    input.type = 'text';
    input.placeholder = 'palavra-chave';
    input.id = `graduationList-${containerIndex}-keyword-input-${index}`;
    input.setAttribute('aria-label', 'Texto da palavra-chave');
    if (value) input.value = value;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'keyword-remove';
    removeBtn.setAttribute('aria-label', 'Remover palavra-chave');
    removeBtn.addEventListener('click', () => kwDiv.remove());

    kwDiv.appendChild(input);
    kwDiv.appendChild(removeBtn);
    container.appendChild(kwDiv);
  }

  #populateItem(item, index, data) {
    const setInputValue = (selector, value) => {
      if (value !== undefined) {
        const el = item.querySelector(selector);
        if (el) el.value = value;
      }
    };

    setInputValue('.title', data.title);
    setInputValue('.institution', data.institution);
    setInputValue('.startsAt', data.startsAt);
    setInputValue('.endsAt', data.endsAt);

    const currentlyCheckbox = item.querySelector('.currently');
    if (currentlyCheckbox && data.currently !== undefined) {
      currentlyCheckbox.checked = data.currently;
      currentlyCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    }

    setInputValue('.description', data.description);

    const keywordsSub = item.querySelector('.keywords-sub');
    data.keywords?.forEach(kw => this.#addKeyword(keywordsSub, index, kw));
  }
}