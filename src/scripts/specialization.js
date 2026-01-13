export class Specialization {
  #specializationList;
  #AddButton;

  constructor() {
    this.#specializationList = document.querySelector('#specializationList');
    this.#AddButton = document.querySelector('#specializationAdd');

    this.#AddButton?.addEventListener('click', () => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <input class="title" placeholder="Título"/>
        <input class="institution" placeholder="Instituição"/>
        <input type="number" class="duration" placeholder="Duração (horas)"/>
        <textarea class="description" placeholder="Descrição"></textarea>
        <button class="remove"></button>
      `;

      const keywordsSub = document.createElement('div');
      keywordsSub.className = 'keywords-sub';

      const keywordsAddBtn = document.createElement('button');
      keywordsAddBtn.type = 'button';
      keywordsAddBtn.className = 'keywords-add';
      keywordsAddBtn.textContent = '+ Adicionar palavra-chave';

      keywordsAddBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const kwDiv = document.createElement('div');
        kwDiv.className = 'keyword-tag-inline';
        kwDiv.innerHTML = `
          <input class="keyword-input" type="text" placeholder="Keyword" />
          <button type="button" class="keyword-remove"></button>
        `;
        kwDiv.querySelector('.keyword-remove').addEventListener('click', () => kwDiv.remove());
        keywordsSub.appendChild(kwDiv);
      });

      div.appendChild(keywordsSub);
      div.appendChild(keywordsAddBtn);

      div.querySelector('.remove').addEventListener('click', () => div.remove());
      this.#specializationList?.appendChild(div);
    });
  }
}