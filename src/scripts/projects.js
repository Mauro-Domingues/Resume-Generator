export class Project {
  #projectList;
  #AddButton;

  constructor() {
    this.#projectList = document.querySelector('#projectsList');
    this.#AddButton = document.querySelector('#projectsAdd');

    this.#AddButton?.addEventListener('click', () => {
      const div = document.createElement('div');
      div.className = 'item';

      div.innerHTML = `
        <input class="title" placeholder="Título" />
        <textarea class="description" placeholder="Descrição"></textarea>
        <div class="image-input-wrapper">
          <input type="file" class="banner" accept="image/*" data-base64="" />
          <button type="button" class="banner-remove">Clear Image</button>
        </div>
        <input class="link-value" placeholder="Display Link" />
        <input class="link-ref" placeholder="Link URL" />
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

      const bannerInput = div.querySelector('.banner');
      const clearBtn = div.querySelector('.banner-remove');

      bannerInput.addEventListener('change', (event) => {
        const file = event.target.files?.[0];

        if (file) {
          const reader = new FileReader();
          reader.onload = (onloadEvent) => {
            bannerInput.dataset.base64 = onloadEvent.target?.result || '';
          };
          reader.readAsDataURL(file);
        }
      });

      clearBtn.addEventListener('click', (event) => {
        event.preventDefault();
        bannerInput.value = '';
        bannerInput.dataset.base64 = '';
      });

      removeBtn.addEventListener('click', () => div.remove());
      this.#projectList?.appendChild(div);
    });
  }
}
