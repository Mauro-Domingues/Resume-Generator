export class Description {
  #container;
  #addButton;

  constructor() {
    this.#container = document.querySelector('#aboutDescriptions');
    this.#addButton = document.querySelector('#aboutDescriptionsAdd');
    this.#setupEventListeners();
  }

  init(descriptions = []) {
    descriptions.forEach(desc => this.#addItem(desc));
  }

  #setupEventListeners() {
    this.#addButton?.addEventListener('click', (event) => {
      event.preventDefault();
      this.#addItem();
    });
  }

  #addItem(value = '') {
    const index = this.#container?.children.length || 0;
    const item = document.createElement('li');
    item.className = 'description-tag';
    item.setAttribute('aria-label', 'Parágrafo de descrição');

    const textarea = document.createElement('textarea');
    textarea.id = `aboutDescriptions-description-${index}`;
    textarea.className = 'description-input';
    textarea.placeholder = 'Descrição';
    textarea.setAttribute('aria-label', 'Texto da descrição');
    if (value) textarea.value = value;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'description-remove remove';
    removeBtn.setAttribute('aria-label', 'Remover descrição');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(textarea);
    item.appendChild(removeBtn);

    this.#container?.appendChild(item);
  }
}
