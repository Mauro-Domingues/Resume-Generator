export class Specialization {
  #specializationList;
  #addButton;

  constructor() {
    this.#specializationList = document.querySelector('#specializationList');
    this.#addButton = document.querySelector('#specializationAdd');
    this.#setupEventListeners();
  }

  init(specializations = []) {
    specializations.forEach(spec => this.#addItem(spec));
  }

  #setupEventListeners() {
    this.#addButton?.addEventListener('click', () => this.#addItem());
  }

  #addItem(data = null) {
    const index = this.#specializationList?.children.length || 0;
    const item = document.createElement('li');
    item.className = 'item';
    item.setAttribute('aria-label', 'Item de especialização');

    item.innerHTML = `
      <label for="specializationList-title-${index}">TÍTULO</label>
      <input id="specializationList-title-${index}" class="title" placeholder="Título" aria-label="Título da especialização" />
      <label for="specializationList-institution-${index}">INSTITUIÇÃO</label>
      <input id="specializationList-institution-${index}" class="institution" placeholder="Instituição" aria-label="Nome da instituição" />
      <label for="specializationList-duration-${index}">DURAÇÃO (HORAS)</label>
      <input type="number" id="specializationList-duration-${index}" class="duration" placeholder="Duração (horas)" aria-label="Duração em horas" />
      <label for="specializationList-description-${index}">DESCRIÇÃO</label>
      <textarea id="specializationList-description-${index}" class="description" placeholder="Descrição" aria-label="Descrição da especialização"></textarea>
    `;

    const keywordsSub = document.createElement('li');
    keywordsSub.className = 'keywords-sub';
    keywordsSub.setAttribute('aria-label', 'Palavras-chave da especialização');

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
      this.#addKeyword(keywordsSub);
    });

    item.appendChild(keywordsAddBtn);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.setAttribute('aria-label', 'Remover especialização');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(removeBtn);

    if (data) {
      this.#populateItem(item, index, data);
    }

    this.#specializationList?.appendChild(item);
  }

  #addKeyword(container, value = '') {
    const index = container?.children.length || 0;
    const kwDiv = document.createElement('li');
    kwDiv.className = 'keyword-tag-inline';
    kwDiv.setAttribute('aria-label', 'Palavra-chave');

    const input = document.createElement('input');
    input.className = 'keyword-input';
    input.type = 'text';
    input.placeholder = 'palavra-chave';
    input.id = `specializationList-keyword-input-${index}`;
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
    setInputValue('.duration', data.duration);
    setInputValue('.description', data.description);

    const keywordsSub = item.querySelector('.keywords-sub');
    data.keywords?.forEach(kw => this.#addKeyword(keywordsSub, index, kw));
  }
}