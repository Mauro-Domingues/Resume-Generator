import { PuppeteerProvider } from './puppeteer.js'
import { appendFileSync, truncateSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { PdfContent } from './content.js'
import rawData from './data/raw.json' assert {type: 'json'}

const provider = new PuppeteerProvider()

provider.generate({
  template: new PdfContent().getContent({
    file: resolve('template', 'index.hbs'),
    variables: rawData
  })
}).then(result => {
  const pdfPath = resolve('resume.pdf')

  if (existsSync(pdfPath)) {
    truncateSync(pdfPath)
  }

  appendFileSync(pdfPath, result)
})