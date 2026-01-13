export class Experience {
  #experienceAddBtn;
  #experienceList;

  constructor() {
    this.#experienceList = document.querySelector('#experienceList');
    this.#experienceAddBtn = document.querySelector('#experienceAdd');


    this.#experienceAddBtn?.addEventListener('click', () => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <input class="title" placeholder="Cargo"/>
        <input class="company" placeholder="Empresa"/>
        <input type="date" class="startsAt"/>
        <input type="date" class="endsAt"/>
        <label>Trabalha Atualmente? <input type="checkbox" class="currently"/></label>
        <textarea class="description" placeholder="Descrição"></textarea>
      `;

      const keywordsSub = document.createElement('div');
      keywordsSub.className = 'keywords-sub';
      div.appendChild(keywordsSub);

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
      div.appendChild(keywordsAddBtn);

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove';
      div.appendChild(removeBtn);

      const currentlyCheckbox = div.querySelector('.currently');
      const endsAtInput = div.querySelector('.endsAt');

      currentlyCheckbox?.addEventListener('change', (event) => {
        if (endsAtInput) {
          endsAtInput.style.display = event.target.checked ? 'none' : 'block';
        }
      });

      removeBtn.addEventListener('click', () => div.remove());

      this.#experienceList.appendChild(div);
    });
  }
}
