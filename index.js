import { PuppeteerProvider } from './puppeteer.js'
import { appendFileSync, truncateSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { PdfContent } from './content.js'

const provider = new PuppeteerProvider()


const assets = {
  header: { name: 'Mauro Domingues' },
  contact: {
    whatsapp: { value: '5535991248514', color: '#706f6f' },
    github: { value: 'https://google.com', color: '#706f6f' },
    email: { value: 'maurinho.villa@hotmail.com', color: '#706f6f' },
    address: { value: 'Pouso Alegre - Minas Gerais', color: '#706f6f' },
    linkedin: { value: 'https://linkedin.com', color: '#706f6f' },
    personal: [
      { value: 'portifólio.com', href: 'https://google.com', color: '#706f6f' },
    ]
  },
  target: { position: 'Desenvolvedor back-end' },
  about: {
    descriptions: ['Desenvolvedor web focado em back-end com sólida experiência em design e construção de APIs em node.js e typescript, utilizando preferencialmente o express e o typeorm.',
      'Possuo experiência com bancos de dados relacionais e não relacionais, conteinerização utilizando docker e infraestrutura com nginx, além de conhecimento em front- end com react, next e angular.',
      'Já atuei em dezenas de produtos, desde sistemas legados ao SDLC de novos projetos e também sou responsável pela gestão e acompanhamento de novos desenvolvedores na equipe.',
      'Possuo uma boa curva de aprendizado, muita atenção a detalhes e nível de inglês intermediário/ avançado.'],
  },
  projects: [
    {
      title: 'Desenvolvedor de Software',
      description: 'Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.',
      banner: "images/project-logo.jpg"
    },
    {
      title: 'Desenvolvedor de Software',
      description: 'Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.',
      banner: "images/project-logo.jpg"
    }
  ],
  graduation: [
    {
      title: 'Desenvolvedor de Software',
      institution: 'Rise Studio',
      period: 'outubro de 2022 - até o momento',
      description: 'Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.'
    },
    {
      title: 'Desenvolvedor de Software',
      institution: 'Rise Studio',
      period: 'outubro de 2022 - até o momento',
      description: 'Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.'
    }
  ],
  specialization: [
    {
      title: 'Desenvolvedor de Software',
      institution: 'Rise Studio',
      period: 'outubro de 2022 - até o momento',
      description: 'Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.'
    },
    {
      title: 'Desenvolvedor de Software',
      institution: 'Rise Studio',
      period: 'outubro de 2022 - até o momento',
      description: 'Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.'
    }
  ],
  experience: [
    {
      title: 'Desenvolvedor de Software',
      company: 'Rise Studio',
      period: 'outubro de 2022 - até o momento',
      description: 'Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.'
    },
    {
      title: 'Desenvolvedor de Software',
      company: 'Rise Studio',
      period: 'outubro de 2022 - até o momento',
      description: 'Desenvolvi soluções personalizadas para diversos clientes e colaborei com equipes multidisciplinares. Além disso, orientei novos membros da equipe, promovendo um ambiente de crescimento contínuo.'
    }
  ]
}

provider.generate({
  template: new PdfContent().getContent({
    file: resolve('template', 'index.hbs'),
    variables: assets
  })
}).then(result => {
  const pdfPath = resolve('resume.pdf')

  if (existsSync(pdfPath)) {
    truncateSync(pdfPath)
  }

  appendFileSync(pdfPath, result)
})