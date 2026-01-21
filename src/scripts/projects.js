export class Project {
  #projectList;
  #addButton;

  constructor() {
    this.#projectList = document.querySelector('#projectsList');
    this.#addButton = document.querySelector('#projectsAdd');
    this.#setupEventListeners();
  }

  init(projects = []) {
    projects.forEach(project => this.#addItem(project));
  }

  #setupEventListeners() {
    this.#addButton?.addEventListener('click', () => this.#addItem());
  }

  #addItem(data = null) {
    const index = this.#projectList?.children.length || 0;
    const item = document.createElement('li');
    item.className = 'item';
    item.setAttribute('aria-label', 'Item de projeto');

    item.innerHTML = `
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

    const keywordsSub = document.createElement('li');
    keywordsSub.className = 'keywords-sub';
    keywordsSub.setAttribute('aria-label', 'Palavras-chave do projeto');

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
    removeBtn.setAttribute('aria-label', 'Remover projeto');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(removeBtn);

    const bannerInput = item.querySelector('.banner');
    const clearBtn = item.querySelector('.banner-remove');

    bannerInput.addEventListener('change', (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          bannerInput.dataset.base64 = e.target?.result || '';
        };
        reader.readAsDataURL(file);
      }
    });

    clearBtn.addEventListener('click', (event) => {
      event.preventDefault();
      bannerInput.value = '';
      bannerInput.dataset.base64 = '';
    });

    if (data) {
      this.#populateItem(item, index, data);
    }

    this.#projectList?.appendChild(item);
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
    input.id = `projectsList-${containerIndex}-keyword-input-${index}`;
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
    setInputValue('.description', data.description);
    setInputValue('.link-value', data.link?.value);
    setInputValue('.link-ref', data.link?.ref);

    if (data.banner) {
      const bannerInput = item.querySelector('.banner');
      if (bannerInput) {
        bannerInput.dataset.base64 = data.banner;
      }
    }

    const keywordsSub = item.querySelector('.keywords-sub');
    data.keywords?.forEach(kw => this.#addKeyword(keywordsSub, index, kw));
  }
}
