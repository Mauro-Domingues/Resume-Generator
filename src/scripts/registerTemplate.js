import { ParseContent } from './parseContent.js';

export class RegisterTemplate {
  #parseContent;
  #languageConfig;
  #basePath;

  constructor() {
    this.#parseContent = new ParseContent();
    this.#basePath = './src';
    this.#languageConfig = this.#initializeLanguageConfig();
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

  #initializeLanguageConfig() {
    return {
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
    const formats = {
      13: /^(\d{2})(\d{2})(\d{5})(\d{4})$/,
      12: /^(\d{2})(\d{2})(\d{4})(\d{4})$/,
      11: /^(\d{2})(\d{5})(\d{4})$/,
      10: /^(\d{2})(\d{4})(\d{4})$/,
      9: /^(\d{5})(\d{4})$/,
      8: /^(\d{4})(\d{4})$/,
    };

    const replacements = {
      13: '+$1 ($2) $3-$4',
      12: '+$1 ($2) $3-$4',
      11: '($1) $2-$3',
      10: '($1) $2-$3',
      9: '$1-$2',
      8: '$1-$2',
    };

    const format = formats[phone.length];
    const replacement = replacements[phone.length];

    return format && replacement ? phone.replace(format, replacement) : phone;
  }

  #orderArray(data) {
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

  #formatPeriod(templateConfig, item) {
    const locale = this.#languageConfig[templateConfig.language].period.format;
    const dateOptions = { year: 'numeric', month: 'long' };

    const startDate = new Date(item.startsAt).toLocaleDateString(
      locale,
      dateOptions,
    );

    if (item.currently || !item.endsAt) {
      return `${startDate} - ${this.#languageConfig[templateConfig.language].period.untilNow}`;
    }

    const endDate = new Date(item.endsAt).toLocaleDateString(
      locale,
      dateOptions,
    );
    return `${startDate} - ${endDate}`;
  }

  #joinKeywords(keywords) {
    return keywords?.join(',');
  }

  #prepareItems(templateConfig, data) {
    if (!data?.length) return [];

    this.#orderArray(data);

    return data.map(item => ({
      ...item,
      period: this.#formatPeriod(templateConfig, item),
      keywords: this.#joinKeywords(item.keywords),
    }));
  }

  async #registerIcons({ templateConfig }) {
    const icons = [
      'diploma-icon',
      'envelope-icon',
      'github-icon',
      'institution-icon',
      'linkedin-icon',
      'location-icon',
      'pin-icon',
      'site-icon',
      'whatsapp-icon',
    ];

    for (const icon of icons) {
      await this.#parseContent.parsePartial({
        name: icon.replace('-icon', 'Icon'),
        file: this.#resolve(this.#basePath, 'resume', 'icons', `${icon}.hbs`),
        variables: templateConfig,
      });
    }
  }

  async #registerCss({ templateConfig }) {
    const styles = [
      { name: 'rootStyle', path: ['root.hbs'], variables: templateConfig },
      { name: 'baseStyle', path: ['styles.css'] },
      { name: 'resumeStyle', path: [templateConfig.name, 'resume.css'] },
      { name: 'headerStyle', path: [templateConfig.name, 'header.css'] },
      { name: 'aboutStyle', path: [templateConfig.name, 'about.css'] },
      { name: 'skillsStyle', path: [templateConfig.name, 'skills.css'] },
      { name: 'targetStyle', path: [templateConfig.name, 'target.css'] },
      {
        name: 'graduationStyle',
        path: [templateConfig.name, 'graduation.css'],
      },
      {
        name: 'specializationStyle',
        path: [templateConfig.name, 'specialization.css'],
      },
      { name: 'projectsStyle', path: [templateConfig.name, 'projects.css'] },
      {
        name: 'experienceStyle',
        path: [templateConfig.name, 'experience.css'],
      },
    ];

    for (const style of styles) {
      await this.#parseContent.parsePartial({
        name: style.name,
        file: this.#resolve(this.#basePath, 'resume', 'styles', ...style.path),
        variables: style.variables,
      });
    }
  }

  async #registerHbs(variables) {
    const {
      templateConfig,
      aboutSection,
      experienceSection,
      graduationSection,
      headerSection,
      projectSection,
      skillSection,
      specializationSection,
      targetSection,
    } = variables;

    await this.#registerContactSection(headerSection);
    await this.#registerHeaderSection(headerSection);
    await this.#registerAboutSection(templateConfig, aboutSection);
    await this.#registerTargetSection(templateConfig, targetSection);
    await this.#registerExperienceSection(templateConfig, experienceSection);
    await this.#registerGraduationSection(templateConfig, graduationSection);
    await this.#registerSpecializationSection(
      templateConfig,
      specializationSection,
    );
    await this.#registerSkillSection(templateConfig, skillSection);
    await this.#registerProjectSection(templateConfig, projectSection);
  }

  async #registerContactSection(headerSection) {
    await this.#parseContent.parsePartial({
      name: 'contactSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'contact.hbs'),
      variables: {
        ...headerSection.contact,
        ...(headerSection?.contact?.whatsapp?.value && {
          whatsapp: {
            value: this.#formatPhoneNumber(
              headerSection.contact.whatsapp.value,
            ),
            ref: headerSection.contact.whatsapp.value,
          },
        }),
      },
    });
  }

  async #registerHeaderSection(headerSection) {
    await this.#parseContent.parsePartial({
      name: 'headerSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'header.hbs'),
      variables: headerSection,
    });
  }

  async #registerAboutSection(templateConfig, aboutSection) {
    await this.#parseContent.parsePartial({
      name: 'aboutSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'about.hbs'),
      variables: {
        ...aboutSection,
        keywords: this.#joinKeywords(aboutSection.keywords),
        aboutTexts: this.#languageConfig[templateConfig.language].aboutTexts,
      },
    });
  }

  async #registerTargetSection(templateConfig, targetSection) {
    await this.#parseContent.parsePartial({
      name: 'targetSection',
      file: this.#resolve(this.#basePath, 'resume', 'templates', 'target.hbs'),
      variables: {
        ...targetSection,
        keywords: this.#joinKeywords(targetSection.keywords),
        targetTexts: this.#languageConfig[templateConfig.language].targetTexts,
      },
    });
  }

  async #registerExperienceSection(templateConfig, experienceSection) {
    await this.#parseContent.parsePartial({
      name: 'experienceSection',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'templates',
        'experience.hbs',
      ),
      variables: {
        experiences: this.#prepareItems(
          templateConfig,
          experienceSection.experiences,
        ),
        experienceTexts:
          this.#languageConfig[templateConfig.language].experienceTexts,
      },
    });
  }

  async #registerGraduationSection(templateConfig, graduationSection) {
    await this.#parseContent.parsePartial({
      name: 'graduationSection',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'templates',
        'graduation.hbs',
      ),
      variables: {
        graduations: this.#prepareItems(
          templateConfig,
          graduationSection.graduations,
        ),
        graduationTexts:
          this.#languageConfig[templateConfig.language].graduationTexts,
      },
    });
  }

  async #registerSpecializationSection(templateConfig, specializationSection) {
    await this.#parseContent.parsePartial({
      name: 'specializationSection',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'templates',
        'specialization.hbs',
      ),
      variables: specializationSection.specializations && {
        specializations: specializationSection.specializations.map(spec => ({
          ...spec,
          keywords: this.#joinKeywords(spec.keywords),
        })),
        specializationTexts:
          this.#languageConfig[templateConfig.language].specializationTexts,
      },
    });
  }

  async #registerSkillSection(templateConfig, skillSection) {
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
  }

  async #registerProjectSection(templateConfig, projectSection) {
    await this.#parseContent.parsePartial({
      name: 'projectSection',
      file: this.#resolve(
        this.#basePath,
        'resume',
        'templates',
        'projects.hbs',
      ),
      variables: projectSection.projects && {
        projects: projectSection.projects.map(project => ({
          ...project,
          keywords: this.#joinKeywords(project.keywords),
        })),
        projectTexts:
          this.#languageConfig[templateConfig.language].projectTexts,
      },
    });
  }
}
