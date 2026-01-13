export class Header {
  #whatsappInput;

  constructor() {
    this.#whatsappInput = document.querySelector('#headerWhatsapp');
    this.#setupWhatsappMask();
    this.#setupPersonalLinks();
  }

  #applyWhatsappMask(value) {
    const numbers = value.replaceAll(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }

  #setupWhatsappMask() {
    this.#whatsappInput?.addEventListener('input', (event) => {
      event.target.value = this.#applyWhatsappMask(event.target.value);
    });
  }

  #setupPersonalLinks() {
    const personalLinksContainer = document.querySelector('#personalLinks');
    const personalLinksAddBtn = document.querySelector('#personalLinksAdd');

    personalLinksAddBtn?.addEventListener('click', (event) => {
      event.preventDefault();
      personalLinksContainer?.appendChild(this.#createPersonalLinkRow());
    });
  }

  #createPersonalLinkRow(data) {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <input class="title" placeholder="Nome do Site (e.g., Portfolio)"/>
      <input class="url" placeholder="URL do Site"/>
      <button class="remove"></button>
    `;
    div.querySelector('.remove').addEventListener('click', () => div.remove());
    return div;
  }
}
