import { DataCollector } from './data-collector.js';
import { RegisterTemplate } from './registerTemplate.js';

export class FormActions {
  #registerTemplate

  constructor() {
    this.#registerTemplate = new RegisterTemplate();
  }

  async #updatePreview() {
    const variables = DataCollector.collect();

    const previewFrame = document.querySelector('#previewFrame');

    if (previewFrame) {
      const htmlContent = await this.#registerTemplate.getContent(variables);

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      previewFrame.src = url;
    }
  }

  async #setupAutoPreview() {
    let debounceTimer;
    const updatePreviewDebounced = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => await this.#updatePreview(), 500);
    };

    const main = document.querySelector('main');
    main.addEventListener('input', updatePreviewDebounced);
    main.addEventListener('change', updatePreviewDebounced);

    await this.#updatePreview();
  }

  async #setupDownloadPDFButton() {
    const previewBtn = document.querySelector('#downloadPdf');
    if (!previewBtn) return;

    previewBtn.addEventListener('click', async () => {
      const variables = DataCollector.collect();
      const htmlContent = await this.#registerTemplate.getContent(variables);

      const printWindow = window.open('', '_blank');
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      printWindow.onafterprint = () => {
        printWindow.close();
      };

      printWindow.print();
    });
  }

  setupAllActions() {
    this.#setupAutoPreview();
    this.#setupDownloadPDFButton();
  }
}
