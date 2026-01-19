import { DataCollector } from './data-collector.js';
import { RegisterTemplate } from './registerTemplate.js';
import { PersistenceManager } from './persistence.js';

export class FormActions {
  #registerTemplate;
  #sectionManagers;

  constructor(sectionManagers = {}) {
    this.#registerTemplate = new RegisterTemplate();
    this.#sectionManagers = sectionManagers;
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

  #saveFormData() {
    const data = DataCollector.collect();
    PersistenceManager.save(data);
  }

  async #loadFormData() {
    const savedData = PersistenceManager.load();
    if (!savedData) return;

    this.#restoreTemplateConfig(savedData.templateConfig);
    this.#sectionManagers.header?.init(savedData.headerSection);
    this.#sectionManagers.description?.init(savedData.aboutSection?.descriptions);
    this.#sectionManagers.keywordManager?.init('aboutKeywords', savedData.aboutSection?.keywords);
    this.#sectionManagers.skills?.init(savedData.skillSection?.skills);
    this.#sectionManagers.keywordManager?.init('skillsKeywords', savedData.skillSection?.keywords);
    this.#restoreTargetSection(savedData.targetSection);
    this.#sectionManagers.experience?.init(savedData.experienceSection?.experiences);
    this.#sectionManagers.graduation?.init(savedData.graduationSection?.graduations);
    this.#sectionManagers.specialization?.init(savedData.specializationSection?.specializations);
    this.#sectionManagers.project?.init(savedData.projectSection?.projects);

    await this.#updatePreview();
  }

  #restoreTemplateConfig(config) {
    if (!config) return;

    const fieldMap = {
      '#templateModel': config.name,
      '#templateLanguage': config.language,
      '#templateFontColor': config.fontColor,
      '#templateFontSize': config.fontSize
    };

    Object.entries(fieldMap).forEach(([selector, value]) => {
      if (value !== undefined) {
        const element = document.querySelector(selector);
        if (element) element.value = value;
      }
    });

    const monochromeCheckbox = document.querySelector('#templateMonochrome');
    if (monochromeCheckbox && config.monochrome !== undefined) {
      monochromeCheckbox.checked = config.monochrome;
    }
  }

  #restoreTargetSection(target) {
    if (!target) return;

    const positionInput = document.querySelector('#targetPosition');
    if (positionInput && target.position) {
      positionInput.value = target.position;
    }

    this.#sectionManagers.keywordManager?.init('targetKeywords', target.keywords);
  }

  #setupAutoPreview() {
    let debounceTimer;
    const updatePreviewDebounced = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        await this.#updatePreview();
        this.#saveFormData();
      }, 500);
    };

    const main = document.querySelector('main');
    main.addEventListener('input', updatePreviewDebounced);
    main.addEventListener('change', updatePreviewDebounced);

    this.#updatePreview();
  }

  #setupDownloadPDFButton() {
    const downloadBtn = document.querySelector('#downloadPdf');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', async () => {
      const variables = DataCollector.collect();
      const htmlContent = await this.#registerTemplate.getContent(variables);

      const printWindow = window.open('', '_self');
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      printWindow.onafterprint = () => {
        printWindow.close();
      };

      printWindow.print();
    });
  }

  async setupAllActions() {
    await this.#loadFormData();
    this.#setupAutoPreview();
    this.#setupDownloadPDFButton();
  }
}
