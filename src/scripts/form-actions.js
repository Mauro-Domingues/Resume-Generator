import { DataCollector } from './data-collector.js';
import { PDFService } from './PDFService.js';
import { RegisterTemplate } from './registerTemplate.js';

export class FormActions {
  registerTemplate
  PDFService

  constructor() {
    this.registerTemplate = new RegisterTemplate();
    // this.PDFService = new PDFService();
  }

  async updatePreview() {
    const variables = DataCollector.collect();

    const previewFrame = document.querySelector('#previewFrame');

    if (previewFrame) {
      const htmlContent = await this.registerTemplate.getContent(variables);

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      previewFrame.src = url;

      console.log('Preview atualizado:', htmlContent.length, 'caracteres');
    }
  }

  async setupAutoPreview() {
    let debounceTimer;
    const updatePreviewDebounced = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => await this.updatePreview(), 500);
    };

    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('input', updatePreviewDebounced);
      input.addEventListener('change', updatePreviewDebounced);
    });

    await this.updatePreview();
  }

  async setupDownloadPDFButton() {
    // const previewBtn = document.querySelector('#downloadPdf');
    // if (!previewBtn) return;

    // previewBtn.addEventListener('click', async () => {
    // const variables = DataCollector.collect();
    // const htmlContent = await this.registerTemplate.getContent(variables);

    // await this.PDFService.generate(htmlContent)
    // });
  }

  setupCopyJsonButton() {
    const copyJsonBtn = document.querySelector('#copyJson');
    if (!copyJsonBtn) return;

    copyJsonBtn.addEventListener('click', async () => {
      try {
        const variables = DataCollector.collect();
        const jsonString = JSON.stringify(variables, null, 2);
        await navigator.clipboard.writeText(jsonString);
        alert('JSON copiado para a área de transferência!');
      } catch (err) {
        console.error('Copy JSON error:', err);
        alert('Erro ao copiar JSON: ' + err.message);
      }
    });
  }

  setupAllActions() {
    this.setupAutoPreview();
    this.setupDownloadPDFButton();
    this.setupCopyJsonButton();
  }
}
