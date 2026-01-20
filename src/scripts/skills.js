export class Skills {
  #skillsList;
  #addButton;

  constructor() {
    this.#skillsList = document.querySelector('#skillsList');
    this.#addButton = document.querySelector('#skillsAdd');
    this.#setupEventListeners();
  }

  init(skills = []) {
    skills.forEach(skill => this.#addItem(skill));
  }

  #setupEventListeners() {
    this.#addButton?.addEventListener('click', () => this.#addItem());
  }

  #addItem(data = null) {
    const index = this.#skillsList?.children.length || 0;
    const item = document.createElement('li');
    item.className = 'item';
    item.setAttribute('aria-label', 'Item de habilidade');

    item.innerHTML = `
      <input id="skillsList-title-${index}" class="title" placeholder="Habilidade" aria-label="Nome da habilidade" />
      <select id="skillsList-level-${index}" class="level" aria-label="Nível de proficiência">
        <option value="basic">básico</option>
        <option value="basic-average">iniciante</option>
        <option value="average">intermediário</option>
        <option value="average-advanced">proficiente</option>
        <option value="advanced">avançado</option>
        <option value="advanced-specialized">expert</option>
        <option value="specialized">especializado</option>
      </select>
    `;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.setAttribute('aria-label', 'Remover habilidade');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(removeBtn);

    if (data) {
      this.#populateItem(item, data);
    }

    this.#skillsList?.appendChild(item);
  }

  #populateItem(item, data) {
    if (data.title) {
      const titleInput = item.querySelector('.title');
      if (titleInput) titleInput.value = data.title;
    }

    if (data.level) {
      const levelSelect = item.querySelector('.level');
      if (levelSelect) levelSelect.value = data.level;
    }
  }
}
