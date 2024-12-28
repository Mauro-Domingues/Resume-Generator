import { appendFileSync, readFileSync, truncateSync } from 'node:fs';
import Handlebars from 'handlebars';
import { resolve } from 'node:path';

export class PdfContent {
  #formatPhoneNumber(phone) {
    if (phone.length === 13) {
      return phone.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4');
    } else if (phone.length === 12) {
      return phone.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, '+$1 ($2) $3-$4');
    } else if (phone.length === 11) {
      return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (phone.length === 10) {
      return phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
      return phone;
    }
  }

  #registerPartial({
    name,
    file,
    variables,
  }) {
    const templateFileContent = readFileSync(file, {
      encoding: 'utf-8',
    });

    const partialTemplate = Handlebars.compile(templateFileContent);
    const parsedPartialTemplate = partialTemplate(variables);

    Handlebars.registerPartial(name, parsedPartialTemplate);
  }

  #parse({ file, variables }) {
    const templateFileContent = readFileSync(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = Handlebars.compile(templateFileContent, {
      compat: true,
    });

    return parseTemplate(variables);
  }

  #getImageBase64(path) {
    const imageBase64 = readFileSync(path, 'base64');
    return `data:image/svg+xml;base64,${imageBase64}`;
  }

  #registerIcons({ variables }) {
    this.#registerPartial({
      name: 'diplomaIcon',
      file: resolve('images', 'diploma-icon.svg'),
      variables: variables.contact
    });
    this.#registerPartial({
      name: 'envelopeIcon',
      file: resolve('images', 'envelope-icon.svg'),
      variables: variables.contact
    });
    this.#registerPartial({
      name: 'githubIcon',
      file: resolve('images', 'github-icon.svg'),
      variables: variables.contact
    });
    this.#registerPartial({
      name: 'institutionIcon',
      file: resolve('images', 'institution-icon.svg'),
    });
    this.#registerPartial({
      name: 'linkedinIcon',
      file: resolve('images', 'linkedin-icon.svg'),
      variables: variables.contact
    });
    this.#registerPartial({
      name: 'locationIcon',
      file: resolve('images', 'location-icon.svg'),
      variables: variables.contact
    });
    this.#registerPartial({
      name: 'pinIcon',
      file: resolve('images', 'pin-icon.svg'),
      variables: variables.contact
    });
    this.#registerPartial({
      name: 'siteIcon',
      file: resolve('images', 'site-icon.svg'),
      variables: variables.contact
    });
    this.#registerPartial({
      name: 'whatsappIcon',
      file: resolve('images', 'whatsapp-icon.svg'),
      variables: variables.contact
    });
  }

  #registerCss() {
    this.#registerPartial({
      name: 'styles',
      file: resolve('styles', 'styles.css'),
    });
    this.#registerPartial({
      name: 'resume',
      file: resolve('styles', 'resume.css'),
    });
  }

  #registerHbs({ variables }) {
    this.#registerPartial({
      name: 'contact',
      file: resolve('template', 'contact.hbs'),
      variables: {
        ...variables.contact, whatsapp: {
          ...variables.contact.whatsapp,
          value: this.#formatPhoneNumber(variables.contact.whatsapp.value),
          href: variables.contact.whatsapp.value
        }
      },
    });
    this.#registerPartial({
      name: 'header',
      file: resolve('template', 'header.hbs'),
      variables: variables.header,
    });
    this.#registerPartial({
      name: 'about',
      file: resolve('template', 'about.hbs'),
      variables: variables.about,
    });
    this.#registerPartial({
      name: 'target',
      file: resolve('template', 'target.hbs'),
      variables: variables.target,
    });
    this.#registerPartial({
      name: 'experience',
      file: resolve('template', 'experience.hbs'),
      variables: variables,
    });
    this.#registerPartial({
      name: 'graduation',
      file: resolve('template', 'graduation.hbs'),
      variables: variables,
    });
    this.#registerPartial({
      name: 'specialization',
      file: resolve('template', 'specialization.hbs'),
      variables: variables,
    });
    this.#registerPartial({
      name: 'projects',
      file: resolve('template', 'projects.hbs'),
      variables: {
        ...variables, projects: variables.projects?.map(project => {
          return {
            ...project,
            ...(project.banner && { banner: this.#getImageBase64(project.banner) })
          }
        })
      },
    });
  }

  getContent(data) {
    this.#registerIcons(data)
    this.#registerCss()
    this.#registerHbs(data)


    truncateSync('i.html')
    appendFileSync('i.html', this.#parse(data))

    return this.#parse(data)
  }
}