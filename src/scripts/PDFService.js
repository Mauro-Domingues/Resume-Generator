export class PDFService {
  #browser;

  async #init() {
    if (!this.#browser) {
      this.#browser = await launch({
        headless: true,
        executablePath: executablePath(),
        handleSIGINT: true,
        handleSIGHUP: true,
        handleSIGTERM: true,
        channel: 'chrome',
        defaultViewport: null,
        ignoreDefaultArgs: [
          '--disable-extensions',
          '--no-sandbox',
          '--disable-acelerated-2d-canvas',
          '--disable-gpu',
          '--no-first-run',
          '--no-zygote',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--single-process',
          '--mute-audio',
          '--disable-default-apps',
          '--metrics-recording-only',
          '--disable-sync',
          '--disable-cloud-import',
          '--disable-breakpad',
        ],
        pipe: true,
      });
    }
  }

  async generate(data) {
    if (!this.#browser) {
      await this.#init();
    }

    const page = await this.#browser.newPage();

    await page.setContent(data.template, { waitUntil: 'domcontentloaded' });

    const pdf = await page.pdf({
      format: 'A4',
    });

    await page.close({ runBeforeUnload: false });

    return pdf;
  }
}
