export const KeywordMixin = (Base) => class extends Base {
    addKeyword(container, containerIndex, value = '') {
        const index = container?.children.length || 0;
        const kwDiv = document.createElement('li');
        kwDiv.className = 'keyword-tag-inline';
        kwDiv.setAttribute('aria-label', 'Palavra-chave');

        const input = document.createElement('input');
        input.className = 'keyword-input';
        input.type = 'text';
        input.placeholder = 'palavra-chave';
        input.id = `${this.listId}-${containerIndex}-keyword-input-${index}`;
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

    createKeywordsSection(item, index, label = 'Palavras-chave') {
        const keywordsSub = document.createElement('li');
        keywordsSub.className = 'keywords-sub';
        keywordsSub.setAttribute('aria-label', `Palavras-chave do item`);

        const keywordsLabel = document.createElement('h3');
        keywordsLabel.textContent = label;
        keywordsSub.appendChild(keywordsLabel);

        item.appendChild(keywordsSub);

        const keywordsAddBtn = document.createElement('button');
        keywordsAddBtn.type = 'button';
        keywordsAddBtn.className = 'keywords-add';
        keywordsAddBtn.textContent = '+ Adicionar palavra-chave';
        keywordsAddBtn.setAttribute('aria-label', '+ Adicionar palavra-chave');
        keywordsAddBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.addKeyword(keywordsSub, index);
        });

        item.appendChild(keywordsAddBtn);

        return { keywordsSub, keywordsAddBtn };
    }

    populateKeywords(keywordsSub, index, keywords = []) {
        keywords?.forEach(kw => this.addKeyword(keywordsSub, index, kw));
    }
};
