import { ParseContent } from './parseContent.js';

export class RegisterTemplate {
  #parseContent
  #languageConfig
  #basePath

  constructor() {
    this.#parseContent = new ParseContent()
    this.#basePath = this.#resolve('./src');
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

  #resolve(...paths) {
    return paths.join('/');
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
    return keywords?.join(',');
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

  async #registerIcons({ templateConfig }) {
    await this.#parseContent.parsePartial({
      name: 'diplomaIcon',
      file: this.#resolve(this.#basePath, 'resume', 'icons', 'diploma-icon.hbs'),
      variables: templateConfig,
    });
    await this.#parseContent.parsePartial({
      name: 'envelopeIcon',
      file: this.#resolve(this.#basePath, 'resume', 'icons', 'envelope-icon.hbs'),
      variables: templateConfig,
    });
    await this.#parseContent.parsePartial({
      name: 'githubIcon',
      file: this.#resolve(this.#basePath, 'resume', 'icons', 'github-icon.hbs'),
      variables: templateConfig,
    });
    await this.#parseContent.parsePartial({
      name: 'institutionIcon',
      file: this.#resolve(this.#basePath, 'resume', 'icons', 'institution-icon.hbs'),
      variables: templateConfig,
    });
    await this.#parseContent.parsePartial({
      name: 'linkedinIcon',
      file: this.#resolve(this.#basePath, 'resume', 'icons', 'linkedin-icon.hbs'),
      variables: templateConfig,
    });
    await this.#parseContent.parsePartial({
      name: 'locationIcon',
      file: this.#resolve(this.#basePath, 'resume', 'icons', 'location-icon.hbs'),
      variables: templateConfig,
    });
    await this.#parseContent.parsePartial({
      name: 'pinIcon',
      file: this.#resolve(this.#basePath, 'resume', 'icons', 'pin-icon.hbs'),
      variables: templateConfig,
    });
    await this.#parseContent.parsePartial({
      name: 'siteIcon',
      file: this.#resolve(this.#basePath, 'resume', 'icons', 'site-icon.hbs'),
      variables: templateConfig,
    });
    await this.#parseContent.parsePartial({
      name: 'whatsappIcon',
      file: this.#resolve(this.#basePath, 'resume', 'icons', 'whatsapp-icon.hbs'),
      variables: templateConfig,
    });
  }

  async #registerCss({ templateConfig }) {
    await this.#parseContent.parsePartial({
      name: 'rootStyle',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'root.hbs',
      ),
      variables: templateConfig,
    });
    await this.#parseContent.parsePartial({
      name: 'baseStyle',
      file: this.#resolve(this.#basePath, 'resume', 'styles', 'styles.css'),
    });
    await this.#parseContent.parsePartial({
      name: 'resumeStyle',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'resume.css',
      ),
    });
    await this.#parseContent.parsePartial({
      name: 'headerStyle',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'header.css',
      ),
    });
    await this.#parseContent.parsePartial({
      name: 'aboutStyle',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'about.css',
      ),
    });
    await this.#parseContent.parsePartial({
      name: 'skillsStyle',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'skills.css',
      ),
    });
    await this.#parseContent.parsePartial({
      name: 'targetStyle',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'target.css',
      ),
    });
    await this.#parseContent.parsePartial({
      name: 'graduationStyle',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'graduation.css',
      ),
    });
    await this.#parseContent.parsePartial({
      name: 'specializationStyle',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'specialization.css',
      ),
    });
    await this.#parseContent.parsePartial({
      name: 'projectsStyle',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'projects.css',
      ),
    });
    await this.#parseContent.parsePartial({
      name: 'experienceStyle',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'experience.css',
      ),
    });
  }

  async #registerHbs({
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
    await this.#parseContent.parsePartial({
      name: 'contactSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'contact.hbs'),
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
    await this.#parseContent.parsePartial({
      name: 'headerSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'header.hbs'),
      variables: headerSection,
    });
    await this.#parseContent.parsePartial({
      name: 'aboutSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'about.hbs'),
      variables: {
        ...aboutSection,
        keywords: this.#joinKeywords(aboutSection.keywords),
        aboutTexts: this.#languageConfig[templateConfig.language].aboutTexts,
      },
    });
    await this.#parseContent.parsePartial({
      name: 'targetSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'target.hbs'),
      variables: {
        ...targetSection,
        keywords: this.#joinKeywords(targetSection.keywords),
        targetTexts: this.#languageConfig[templateConfig.language].targetTexts,
      },
    });
    await this.#parseContent.parsePartial({
      name: 'experienceSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'experience.hbs'),
      variables: {
        experiences: this.#prepareItems(
          templateConfig,
          experienceSection.experiences,
        ),
        experienceTexts:
          this.#languageConfig[templateConfig.language].experienceTexts,
      },
    });
    await this.#parseContent.parsePartial({
      name: 'graduationSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'graduation.hbs'),
      variables: {
        graduations: this.#prepareItems(
          templateConfig,
          graduationSection.graduations,
        ),
        graduationTexts:
          this.#languageConfig[templateConfig.language].graduationTexts,
      },
    });
    await this.#parseContent.parsePartial({
      name: 'specializationSection',
      file: this.#resolve(
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
    await this.#parseContent.parsePartial({
      name: 'skillSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'skills.hbs'),
      variables: skillSection.skills && {
        skills: skillSection.skills.map(skill => ({
          ...skill,
          level:
            this.#languageConfig[templateConfig.language].skillTexts.options[
            skill.level
            ],
        })),
        keywords: this.#joinKeywords(skillSection.keywords),
        skillTexts: this.#languageConfig[templateConfig.language].skillTexts,
      },
    });
    await this.#parseContent.parsePartial({
      name: 'projectSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'projects.hbs'),
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

  async getContent(variables) {
    await this.#registerIcons(variables);
    await this.#registerCss(variables);
    await this.#registerHbs(variables);

    return this.#parseContent.parseTemplate({
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'index.hbs'),
      variables: {
        ...variables,
        htmlTexts: this.#languageConfig[variables.templateConfig.language].html,
      },
    });
  }
}
