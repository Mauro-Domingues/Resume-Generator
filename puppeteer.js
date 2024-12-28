import { launch } from 'puppeteer';

export class PuppeteerProvider {
  #browser;

  async #init() {
    if (!this.#browser) {
      /**
       * @description If the API doesn't run local, comment out lines 18 and 22 (or install chromium on the pc).
       */
      this.#browser = await launch({
        headless: 'new',
        // executablePath: '/snap/bin/chromium', // @coment
        handleSIGINT: true,
        handleSIGHUP: true,
        handleSIGTERM: true,
        // channel: 'chrome', // @coment
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

  async #close() { return this.#browser.close() }

  // pagination: {
  //   styles: Record<string, string | number>;
  // };
  #getPagination(
    pagination,
  ) {
    const styles = Object.entries(pagination?.styles ?? {})
      .map(([key, value]) => {
        return String.prototype.concat(key, ':', String(value), ';');
      })
      .join(' ');

    return {
      displayHeaderFooter: true,
      headerTemplate: `<div style="${styles}">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>`,
    };
  }

  // {
  //   template: string;
  //   pagination?: {
  //     styles: Record<string, string | number>;
  //   };
  // }
  async generate(data) {
    if (!this.#browser) {
      await this.#init();
    }
    const page = await this.#browser.newPage();

    await page.setContent(data.template, { waitUntil: 'domcontentloaded' });
    const pdf = await page.pdf({
      format: 'A4',
      ...(data.pagination && this.#getPagination(data.pagination)),
    });

    await page.close({ runBeforeUnload: false });

    await this.#close()

    return pdf;
  }
}
