import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { ParseContent } from './ParseContent.js';

export class RegisterTemplate {
  #parseContent
  #languageConfig
  #basePath

  constructor() {
    this.#parseContent = new ParseContent();
    this.#basePath = resolve(cwd());
    this.#languageConfig = {
      enUs: {
        html: { title: 'Curriculum', language: 'en-us' },
        aboutTexts: { title: 'About Me' },
        experienceTexts: {
          title: 'Experience',
          content: {
            title: 'Company',
            period: 'Period',
            description: 'Description',
          },
        },
        graduationTexts: {
          title: 'Education',
          content: {
            title: 'Institution',
            period: 'Period',
            description: 'Description',
          },
        },
        headerTexts: { about: { title: 'About Me' } },
        period: { format: 'en-US', untilNow: 'to present' },
        projectTexts: { title: 'Projects' },
        skillTexts: {
          title: 'Skills',
          options: {
            basic: 'basic',
            'basic-average': 'beginner',
            average: 'intermediate',
            'average-advanced': 'proficient',
            advanced: 'advanced',
            'advanced-specialized': 'expert',
            specialized: 'specialized',
          },
        },
        specializationTexts: {
          title: 'Specialization',
          content: {
            title: 'Institution',
            duration: 'Duration',
            time: 'hours',
            description: 'Description',
          },
        },
        targetTexts: { title: 'Objective' },
      },
      ptBr: {
        html: { title: 'Currículo', language: 'pt-br' },
        aboutTexts: { title: 'Sobre mim' },
        experienceTexts: {
          title: 'Experiência',
          content: {
            title: 'Empresa',
            period: 'Período',
            description: 'Descrição',
          },
        },
        graduationTexts: {
          title: 'Formação',
          content: {
            title: 'Instituição',
            period: 'Período',
            description: 'Descrição',
          },
        },
        headerTexts: { about: { title: 'Sobre mim' } },
        period: { format: 'pt-BR', untilNow: 'até o momento' },
        projectTexts: { title: 'Projetos' },
        skillTexts: {
          title: 'Habilidades',
          options: {
            basic: 'básico',
            'basic-average': 'iniciante',
            average: 'intermediário',
            'average-advanced': 'proficiente',
            advanced: 'avançado',
            'advanced-specialized': 'expert',
            specialized: 'especializado',
          },
        },
        specializationTexts: {
          title: 'Especialização',
          content: {
            title: 'Instituição',
            duration: 'Duração',
            time: 'horas',
            description: 'Descrição',
          },
        },
        targetTexts: { title: 'Objetivo' },
      },
    };
  }

  #formatPhoneNumber(phone) {
    if (phone.length === 13) {
      return phone.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4');
    }
    if (phone.length === 12) {
      return phone.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, '+$1 ($2) $3-$4');
    }
    if (phone.length === 11) {
      return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    if (phone.length === 10) {
      return phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    return phone;
  }

  #orderArrray(data) {
    data.sort((a, b) => {
      if (a.currently && !b.currently) return -1;
      if (!a.currently && b.currently) return 1;
      if (!a.currently && !b.currently) {
        const dateA = new Date(a.endsAt ?? Infinity);
        const dateB = new Date(b.endsAt ?? Infinity);
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });
  }

  #formatPeriod(
    templateConfig,
    item,
  ) {
    const startDate = new Date(item.startsAt).toLocaleDateString(
      this.#languageConfig[templateConfig.language].period.format,
      {
        year: 'numeric',
        month: 'long',
      },
    );

    if (item.currently || !item.endsAt) {
      return `${startDate} - ${this.#languageConfig[templateConfig.language].period.untilNow
        }`;
    }

    const endDate = new Date(item.endsAt).toLocaleDateString(
      this.#languageConfig[templateConfig.language].period.format,
      {
        year: 'numeric',
        month: 'long',
      },
    );

    return `${startDate} - ${endDate}`;
  }

  #joinKeywords(keywords) {
    return keywords.join(',');
  }

  #prepareItems(
    templateConfig,
    data,
  ) {
    if (!data?.length) {
      return [];
    }

    this.#orderArrray(data);

    return data.map(item => ({
      ...item,
      period: this.#formatPeriod(templateConfig, item),
      keywords: this.#joinKeywords(item.keywords),
    }));
  }

  #registerIcons({ templateConfig }) {
    this.#parseContent.parsePartial({
      name: 'diplomaIcon',
      file: resolve(this.#basePath, 'images', 'diploma-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContent.parsePartial({
      name: 'envelopeIcon',
      file: resolve(this.#basePath, 'images', 'envelope-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContent.parsePartial({
      name: 'githubIcon',
      file: resolve(this.#basePath, 'images', 'github-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContent.parsePartial({
      name: 'institutionIcon',
      file: resolve(this.#basePath, 'images', 'institution-icon.svg'),
    });
    this.#parseContent.parsePartial({
      name: 'linkedinIcon',
      file: resolve(this.#basePath, 'images', 'linkedin-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContent.parsePartial({
      name: 'locationIcon',
      file: resolve(this.#basePath, 'images', 'location-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContent.parsePartial({
      name: 'pinIcon',
      file: resolve(this.#basePath, 'images', 'pin-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContent.parsePartial({
      name: 'siteIcon',
      file: resolve(this.#basePath, 'images', 'site-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContent.parsePartial({
      name: 'whatsappIcon',
      file: resolve(this.#basePath, 'images', 'whatsapp-icon.svg'),
      variables: templateConfig,
    });
  }

  #registerCss({ templateConfig }) {
    this.#parseContent.parsePartial({
      name: 'rootStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'root.hbs',
      ),
      variables: templateConfig,
    });
    this.#parseContent.parsePartial({
      name: 'baseStyle',
      file: resolve(this.#basePath, 'resume', 'styles', 'styles.css'),
    });
    this.#parseContent.parsePartial({
      name: 'resumeStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'resume.css',
      ),
    });
    this.#parseContent.parsePartial({
      name: 'headerStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'header.css',
      ),
    });
    this.#parseContent.parsePartial({
      name: 'aboutStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'about.css',
      ),
    });
    this.#parseContent.parsePartial({
      name: 'skillsStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'skills.css',
      ),
    });
    this.#parseContent.parsePartial({
      name: 'targetStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'target.css',
      ),
    });
    this.#parseContent.parsePartial({
      name: 'graduationStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'graduation.css',
      ),
    });
    this.#parseContent.parsePartial({
      name: 'specializationStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'specialization.css',
      ),
    });
    this.#parseContent.parsePartial({
      name: 'projectsStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'projects.css',
      ),
    });
    this.#parseContent.parsePartial({
      name: 'experienceStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'experience.css',
      ),
    });
  }

  #registerHbs({
    templateConfig,
    aboutSection,
    experienceSection,
    graduationSection,
    headerSection,
    projectSection,
    skillSection,
    specializationSection,
    targetSection,
  }) {
    this.#parseContent.parsePartial({
      name: 'contactSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'contact.hbs'),
      variables: {
        ...headerSection.contact,
        ...(headerSection?.contact?.whatsapp?.value &&
        {
          whatsapp: {
            value: this.#formatPhoneNumber(
              headerSection.contact.whatsapp.value,
            ),
            ref: headerSection.contact.whatsapp.value,
          }
        }),
      },
    });
    this.#parseContent.parsePartial({
      name: 'headerSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'header.hbs'),
      variables: headerSection,
    });
    this.#parseContent.parsePartial({
      name: 'aboutSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'about.hbs'),
      variables: {
        ...aboutSection,
        keywords: this.#joinKeywords(aboutSection.keywords),
        aboutTexts: this.#languageConfig[templateConfig.language].aboutTexts,
      },
    });
    this.#parseContent.parsePartial({
      name: 'targetSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'target.hbs'),
      variables: {
        ...targetSection,
        keywords: this.#joinKeywords(targetSection.keywords),
        targetTexts: this.#languageConfig[templateConfig.language].targetTexts,
      },
    });
    this.#parseContent.parsePartial({
      name: 'experienceSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'experience.hbs'),
      variables: {
        experiences: this.#prepareItems(
          templateConfig,
          experienceSection.experiences,
        ),
        experienceTexts:
          this.#languageConfig[templateConfig.language].experienceTexts,
      },
    });
    this.#parseContent.parsePartial({
      name: 'graduationSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'graduation.hbs'),
      variables: {
        graduations: this.#prepareItems(
          templateConfig,
          graduationSection.graduations,
        ),
        graduationTexts:
          this.#languageConfig[templateConfig.language].graduationTexts,
      },
    });
    this.#parseContent.parsePartial({
      name: 'specializationSection',
      file: resolve(
        this.#basePath,
        'resume',
        'templates',
        'specialization.hbs',
      ),
      variables: specializationSection.specializations && {
        specializations: specializationSection.specializations.map(
          specialization => ({
            ...specialization,
            keywords: this.#joinKeywords(specialization.keywords),
          }),
        ),
        specializationTexts:
          this.#languageConfig[templateConfig.language].specializationTexts,
      },
    });
    this.#parseContent.parsePartial({
      name: 'skillSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'skills.hbs'),
      variables: skillSection.skills && {
        skills: skillSection.skills,
        keywords: this.#joinKeywords(skillSection.keywords),
        skillTexts: this.#languageConfig[templateConfig.language].skillTexts,
      },
    });
    this.#parseContent.parsePartial({
      name: 'projectSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'projects.hbs'),
      variables: projectSection.projects && {
        projects: projectSection.projects.map(project => {
          return {
            ...project,
            keywords: this.#joinKeywords(project.keywords),
          };
        }),
        projectTexts:
          this.#languageConfig[templateConfig.language].projectTexts,
      },
    });
  }

  getContent(variables) {
    this.#registerIcons(variables);
    this.#registerCss(variables);
    this.#registerHbs(variables);

    return this.#parseContent.parseTemplate({
      file: resolve(this.#basePath, 'resume', 'templates', 'index.hbs'),
      variables: {
        ...variables,
        htmlTexts: this.#languageConfig[variables.templateConfig.language].html,
      },
    });
  }
}
