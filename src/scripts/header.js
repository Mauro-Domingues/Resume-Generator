export class Header {
  #whatsappInput;
  #personalLinksContainer;
  #personalLinksAddButton;

  constructor() {
    this.#whatsappInput = document.querySelector('#headerWhatsapp');
    this.#personalLinksContainer = document.querySelector('#personalLinks');
    this.#personalLinksAddButton = document.querySelector('#personalLinksAdd');
    this.#setupWhatsappMask();
    this.#setupPersonalLinks();
  }

  init(headerData) {
    if (!headerData) return;

    if (headerData.header?.name) {
      const nameInput = document.querySelector('#headerName');
      if (nameInput) nameInput.value = headerData.header.name;
    }

    if (headerData.contact) {
      this.#restoreContactFields(headerData.contact);
      headerData.contact.personal?.forEach(link => this.#addPersonalLink(link));
    }

    if (headerData.contact?.whatsapp?.value) {
      this.#whatsappInput.value = this.#applyWhatsappMask(
        headerData.contact.whatsapp.value,
      );
    }
  }

  #restoreContactFields(contact) {
    const fieldMap = {
      '#headerEmail': contact.email?.value,
      '#headerAddress': contact.address?.value,
      '#headerWhatsapp': contact.whatsapp?.value,
      '#headerGithubDisplay': contact.github?.value,
      '#headerGithubUrl': contact.github?.ref,
      '#headerLinkedinDisplay': contact.linkedin?.value,
      '#headerLinkedinUrl': contact.linkedin?.ref,
    };

    Object.entries(fieldMap).forEach(([selector, value]) => {
      if (value) {
        const element = document.querySelector(selector);
        if (element) element.value = value;
      }
    });
  }

  #applyWhatsappMask(value) {
    const numbers = value.replaceAll(/\D/g, '');

    const formats = {
      13: /^(\d{2})(\d{2})(\d{5})(\d{4})$/,
      12: /^(\d{2})(\d{2})(\d{4})(\d{4})$/,
      11: /^(\d{2})(\d{5})(\d{4})$/,
      10: /^(\d{2})(\d{4})(\d{4})$/,
      9: /^(\d{5})(\d{4})$/,
      8: /^(\d{4})(\d{4})$/,
    };

    const replacements = {
      13: '+$1 ($2) $3-$4',
      12: '+$1 ($2) $3-$4',
      11: '($1) $2-$3',
      10: '($1) $2-$3',
      9: '$1-$2',
      8: '$1-$2',
    };

    const format = formats[numbers.length];
    const replacement = replacements[numbers.length];

    return format && replacement
      ? numbers.replace(format, replacement)
      : numbers;
  }

  #setupWhatsappMask() {
    this.#whatsappInput?.addEventListener('input', event => {
      event.target.value = this.#applyWhatsappMask(event.target.value);
    });
  }

  #setupPersonalLinks() {
    this.#personalLinksAddButton?.addEventListener('click', event => {
      event.preventDefault();
      this.#addPersonalLink();
    });
  }

  #addPersonalLink(data = null) {
    const index = this.#personalLinksContainer?.children.length || 0;
    const item = document.createElement('li');
    item.className = 'item';
    item.setAttribute('aria-label', 'Link pessoal');

    item.innerHTML = `
      <label for="personalLink-title-${index}">NOME DO SITE</label>
      <input id="personalLink-title-${index}" class="title" placeholder="Nome do Site (e.g., Portfolio)" aria-label="Nome do link" />
      <label for="personalLink-url-${index}">URL DO SITE</label>
      <input id="personalLink-url-${index}" class="url" placeholder="URL do Site" aria-label="URL do link" />
    `;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.setAttribute('aria-label', 'Remover link');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(removeBtn);

    if (data) {
      const titleInput = item.querySelector('.title');
      const urlInput = item.querySelector('.url');
      if (titleInput && data.value) titleInput.value = data.value;
      if (urlInput && data.ref) urlInput.value = data.ref;
    }

    this.#personalLinksContainer?.appendChild(item);
  }
}
