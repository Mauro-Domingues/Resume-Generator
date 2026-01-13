export class Graduation {
  #graduationList;
  #AddButton;

  constructor() {
    this.#graduationList = document.querySelector('#graduationList');
    this.#AddButton = document.querySelector('#graduationAdd');

    this.#AddButton?.addEventListener('click', () => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <input class="title" placeholder="Título"/>
        <input class="institution" placeholder="Instituição"/>
        <input type="date" class="startsAt" placeholder="Início"/>
        <input type="date" class="endsAt" placeholder="Fim"/>
        <label> Cursa Atualmente? <input type="checkbox" class="currently"/></label>
        <textarea class="description" placeholder="Descrição"></textarea>
        <button class="remove"></button>
      `;

      const currentlyCheckbox = div.querySelector('.currently');
      const endsAtInput = div.querySelector('.endsAt');
      const keywordsSub = document.createElement('div');
      keywordsSub.className = 'keywords-sub';

      currentlyCheckbox?.addEventListener('change', (event) => {
        endsAtInput.style.display = event.target?.checked ? 'none' : 'block';
      });

      const keywordsLabel = document.createElement('label');
      keywordsLabel.textContent = 'Palavras-chave';
      keywordsSub.appendChild(keywordsLabel);

      const keywordsAddBtn = document.createElement('button');
      keywordsAddBtn.type = 'button';
      keywordsAddBtn.className = 'keywords-add';
      keywordsAddBtn.textContent = '+ Adicionar palavra-chave';

      keywordsAddBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const kwDiv = document.createElement('div');
        kwDiv.className = 'keyword-tag-inline';
        kwDiv.innerHTML = `
          <input class="keyword-input" type="text" placeholder="palavra-chave" />
          <button type="button" class="keyword-remove"></button>
        `;
        kwDiv.querySelector('.keyword-remove').addEventListener('click', () => kwDiv.remove());
        keywordsSub.appendChild(kwDiv);
      });

      div.appendChild(keywordsSub);
      div.appendChild(keywordsAddBtn);

      div.querySelector('.remove').addEventListener('click', () => div.remove());
      this.#graduationList?.appendChild(div);
    });
  }
}