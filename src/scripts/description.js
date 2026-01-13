export class Description {
  #container;
  #addBtn;

  constructor() {
    this.#container = document.querySelector('#aboutDescriptions');
    this.#addBtn = document.querySelector('#aboutDescriptionsAdd');

    this.#addBtn?.addEventListener('click', (event) => {
      event.preventDefault();

      const div = document.createElement('div');
      div.className = 'description-tag';
      div.innerHTML = `
        <textarea class="description-input" placeholder="Descrição"></textarea>
        <button type="button" class="description-remove"></button>
      `;

      div.querySelector('.description-remove').addEventListener('click', () => div.remove());

      this.#container?.appendChild(div);
    });
  }
}
