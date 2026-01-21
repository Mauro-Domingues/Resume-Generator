export class Experience {
  #experienceList;
  #experienceAddBtn;

  constructor() {
    this.#experienceList = document.querySelector('#experienceList');
    this.#experienceAddBtn = document.querySelector('#experienceAdd');
    this.#setupEventListeners();
  }

  init(experiences = []) {
    experiences.forEach(exp => this.#addItem(exp));
  }

  #setupEventListeners() {
    this.#experienceAddBtn?.addEventListener('click', () => this.#addItem());
  }

  #addItem(data = null) {
    const index = this.#experienceList?.children.length || 0;
    const item = document.createElement('li');
    item.className = 'item';
    item.setAttribute('aria-label', 'Item de experiência profissional');

    item.innerHTML = `
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
          <input type="checkbox" id="experienceList-currently-${index}" />
          Trabalha Atualmente?
        </label>
      </div>
      <label for="experienceList-description-${index}">DESCRIÇÃO</label>
      <textarea id="experienceList-description-${index}" class="description" placeholder="Descrição" aria-label="Descrição das atividades"></textarea>
    `;

    const keywordsSub = document.createElement('li');
    keywordsSub.className = 'keywords-sub';
    keywordsSub.setAttribute('aria-label', 'Palavras-chave da experiência');

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
    removeBtn.setAttribute('aria-label', 'Remover experiência');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(removeBtn);

    const currentlyCheckbox = item.querySelector(`#experienceList-currently-${index}`);
    const endsAtInput = item.querySelector('.endsAt');

    currentlyCheckbox?.addEventListener('change', (event) => {
      if (endsAtInput) {
        endsAtInput.style.display = event.target.checked ? 'none' : 'block';
      }
    });

    if (data) {
      this.#populateItem(item, index, data);
    }

    this.#experienceList?.appendChild(item);
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
    input.id = `experienceList-${containerIndex}-keyword-input-${index}`;
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
    setInputValue('.company', data.company);
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
