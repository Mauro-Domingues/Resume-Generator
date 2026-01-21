export class BaseListManager {
    #listElement;
    #addButton;
    #listId;
    #addButtonId;

    constructor(listId, addButtonId) {
        this.#listId = listId;
        this.#addButtonId = addButtonId;
        this.#listElement = document.querySelector(`#${listId}`);
        this.#addButton = document.querySelector(`#${addButtonId}`);
        this.#setupEventListeners();
    }

    get listId() {
        return this.#listId;
    }

    get listElement() {
        return this.#listElement;
    }

    #setupEventListeners() {
        this.#addButton?.addEventListener('click', () => this.addItem());
    }

    init(items = []) {
        items.forEach(item => this.addItem(item));
    }

    createItemHTML() {
        throw new Error('createItemHTML must be implemented by subclass');
    }

    setupItemBehavior() {
        // Override in subclass if needed
    }

    addItem(data = null) {
        const index = this.#listElement?.children.length || 0;
        const item = document.createElement('li');
        item.className = 'item';
        item.setAttribute('aria-label', this.getItemAriaLabel());

        item.innerHTML = this.createItemHTML(index);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove';
        removeBtn.setAttribute('aria-label', this.getRemoveAriaLabel());
        removeBtn.addEventListener('click', () => item.remove());
        item.appendChild(removeBtn);

        this.setupItemBehavior(item, index);

        if (data) {
            this.populateItem(item, index, data);
        }

        this.#listElement?.appendChild(item);
    }

    populateItem(item, index, data) {
        const setInputValue = (selector, value) => {
            if (value !== undefined) {
                const el = item.querySelector(selector);
                if (el) el.value = value;
            }
        };

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null && typeof value !== 'object') {
                setInputValue(`.${key}`, value);
            }
        });
    }

    getItemAriaLabel() {
        return 'Item da lista';
    }

    getRemoveAriaLabel() {
        return 'Remover item';
    }
}
