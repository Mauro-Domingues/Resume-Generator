export class Skills {
  #skillsAddBtn;
  #skillsList;

  constructor() {
    this.#skillsAddBtn = document.querySelector('#skillsAdd');
    this.#skillsList = document.querySelector('#skillsList');

    this.#skillsAddBtn?.addEventListener('click', () => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <input class="title" placeholder="Habilidade"/>
        <select class="level">
          <option value="basic">básico</option>
          <option value="basic-average">iniciante</option>
          <option value="average">intermediário</option>
          <option value="average-advanced">proficiente</option>
          <option value="advanced">avançado</option>
          <option value="advanced-specialized">expert</option>
          <option value="specialized">especializado</option>
          </select>
        <button class="remove"></button>
      `;

      div.querySelector('.remove').addEventListener('click', () => div.remove());
      this.#skillsList.appendChild(div);
    });
  }
}
