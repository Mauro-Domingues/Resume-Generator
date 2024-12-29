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

  #splitSkills(skills) {
    return skills?.reduce((acc, item, index) => {
      if (index < 7) {
        acc.firstColumn.push(item);
      } else if (index < 14) {
        acc.secondColumn.push(item);
      } else {
        acc.thirdColumn.push(item);
      }
      return acc;
    }, { firstColumn: [], secondColumn: [], thirdColumn: [] });
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

  get #template() { return 'default' }

  #registerCss({ variables }) {
    const template = variables.template ?? this.#template

    this.#registerPartial({
      name: 'rootStyle',
      file: resolve('styles', template, 'root.hbs'),
      variables
    });
    this.#registerPartial({
      name: 'baseStyle',
      file: resolve('styles', 'styles.css'),
    });
    this.#registerPartial({
      name: 'resumeStyle',
      file: resolve('styles', template, 'resume.css'),
    });
    this.#registerPartial({
      name: 'headerStyle',
      file: resolve('styles', template, 'header.css'),
    });
    this.#registerPartial({
      name: 'aboutStyle',
      file: resolve('styles', template, 'about.css'),
    });
    this.#registerPartial({
      name: 'skillsStyle',
      file: resolve('styles', template, 'skills.css'),
    });
    this.#registerPartial({
      name: 'targetStyle',
      file: resolve('styles', template, 'target.css'),
    });
    this.#registerPartial({
      name: 'graduationStyle',
      file: resolve('styles', template, 'graduation.css'),
    });
    this.#registerPartial({
      name: 'specializationStyle',
      file: resolve('styles', template, 'specialization.css'),
    });
    this.#registerPartial({
      name: 'projectsStyle',
      file: resolve('styles', template, 'projects.css'),
    });
    this.#registerPartial({
      name: 'experienceStyle',
      file: resolve('styles', template, 'experience.css'),
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
          ref: variables.contact.whatsapp.value
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
      name: 'skills',
      file: resolve('template', 'skills.hbs'),
      variables: { skills: this.#splitSkills(variables.skills) },
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
    this.#registerCss(data)
    this.#registerHbs(data)


    truncateSync('i.html')
    appendFileSync('i.html', this.#parse(data))

    return this.#parse(data)
  }
}