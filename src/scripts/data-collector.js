import { KeywordManager } from './keyword-manager.js';

export class DataCollector {
  static collect() {
    return {
      templateConfig: this.#collectTemplateConfig(),
      headerSection: this.#collectHeaderSection(),
      aboutSection: this.#collectAboutSection(),
      skillSection: this.#collectSkillSection(),
      targetSection: this.#collectTargetSection(),
      graduationSection: this.#collectGraduationSection(),
      specializationSection: this.#collectSpecializationSection(),
      projectSection: this.#collectProjectSection(),
      experienceSection: this.#collectExperienceSection(),
    };
  }

  static #collectTemplateConfig() {
    return {
      name: document.querySelector('#templateModel')?.value || 'default',
      language: document.querySelector('#templateLanguage')?.value || 'ptBr',
      monochrome:
        document.querySelector('#templateMonochrome')?.checked || false,
      fontFamily:
        document.querySelector('#templateFontFamily')?.value ||
        'Open Sans, sans-serif',
      fontColor:
        document.querySelector('#templateFontColor')?.value || '#706f6f',
      fontSize: document.querySelector('#templateFontSize')?.value || 16,
    };
  }

  static #collectHeaderSection() {
    return {
      header: {
        ...(document.querySelector('#headerName')?.value && {
          name: document.querySelector('#headerName').value,
        }),
      },
      contact: {
        ...(document.querySelector('#headerEmail')?.value && {
          email: { value: document.querySelector('#headerEmail').value },
        }),
        ...(document.querySelector('#headerAddress')?.value && {
          address: { value: document.querySelector('#headerAddress').value },
        }),
        ...(document.querySelector('#headerWhatsapp')?.value && {
          whatsapp: {
            value: document
              .querySelector('#headerWhatsapp')
              .value.replaceAll(/\D/g, ''),
          },
        }),
        ...(document.querySelector('#headerGithubDisplay')?.value && {
          github: {
            value: document.querySelector('#headerGithubDisplay').value,
            ref: document.querySelector('#headerGithubUrl').value,
          },
        }),
        ...(document.querySelector('#headerLinkedinDisplay')?.value && {
          linkedin: {
            value: document.querySelector('#headerLinkedinDisplay').value,
            ref: document.querySelector('#headerLinkedinUrl').value,
          },
        }),
        personal: Array.from(document.querySelectorAll('#personalLinks .item'))
          .map(item => ({
            value: item.querySelector('.title')?.value || undefined,
            ref: item.querySelector('.url')?.value || undefined,
          }))
          .filter(link => link.value || link.ref),
      },
    };
  }

  static #collectAboutSection() {
    return {
      descriptions: Array.from(
        document.querySelectorAll(
          '#aboutDescriptions .description-tag textarea',
        ),
      )
        .map(input => input.value?.trim())
        .filter(Boolean),
      keywords: KeywordManager.getKeywordsFromContainer('aboutKeywords'),
    };
  }

  static #collectSkillSection() {
    return {
      skills: Array.from(document.querySelectorAll('#skillsList .item'))
        .map(item => ({
          title: item.querySelector('.title')?.value || undefined,
          level: item.querySelector('.level')?.value || undefined,
        }))
        .filter(skill => skill.title && skill.level),
      keywords: KeywordManager.getKeywordsFromContainer('skillsKeywords'),
    };
  }

  static #collectTargetSection() {
    return {
      position: document.querySelector('#targetPosition')?.value || undefined,
      keywords: KeywordManager.getKeywordsFromContainer('targetKeywords'),
    };
  }

  static #collectExperienceSection() {
    return {
      experiences: Array.from(
        document.querySelectorAll('#experienceList .item'),
      )
        .map(item => {
          const currently =
            item.querySelector('.currently')?.checked || undefined;
          const keywords = KeywordManager.getKeywordsFromItem(item);

          return {
            title: item.querySelector('.title')?.value || undefined,
            company: item.querySelector('.company')?.value || undefined,
            startsAt: item.querySelector('.startsAt')?.value || undefined,
            ...(!currently && {
              endsAt: item.querySelector('.endsAt')?.value || undefined,
            }),
            currently,
            description: item.querySelector('.description')?.value || undefined,
            ...(keywords.length && { keywords }),
          };
        })
        .filter(item => Object.values(item).filter(Boolean).length),
    };
  }

  static #collectGraduationSection() {
    return {
      graduations: Array.from(
        document.querySelectorAll('#graduationList .item'),
      )
        .map(item => {
          const currently =
            item.querySelector('.currently')?.checked || undefined;
          const keywords = KeywordManager.getKeywordsFromItem(item);

          return {
            title: item.querySelector('.title')?.value || undefined,
            institution: item.querySelector('.institution')?.value || undefined,
            startsAt: item.querySelector('.startsAt')?.value || undefined,
            ...(!currently && {
              endsAt: item.querySelector('.endsAt')?.value || undefined,
            }),
            currently,
            description: item.querySelector('.description')?.value || undefined,
            ...(keywords.length && { keywords }),
          };
        })
        .filter(item => Object.values(item).filter(Boolean).length),
    };
  }

  static #collectProjectSection() {
    return {
      projects: Array.from(document.querySelectorAll('#projectsList .item'))
        .map(item => {
          const keywords = KeywordManager.getKeywordsFromItem(item);

          return {
            title: item.querySelector('.title')?.value || undefined,
            description: item.querySelector('.description')?.value || undefined,
            banner:
              item.querySelector('input[type="file"].banner')?.dataset
                ?.base64 || undefined,
            ...(item.querySelector('.link-value')?.value && {
              link: {
                value: item.querySelector('.link-value').value,
                ref: item.querySelector('.link-ref')?.value || undefined,
              },
            }),
            ...(keywords.length && { keywords }),
          };
        })
        .filter(item => Object.values(item).filter(Boolean).length),
    };
  }

  static #collectSpecializationSection() {
    return {
      specializations: Array.from(
        document.querySelectorAll('#specializationList .item'),
      )
        .map(item => {
          const keywords = KeywordManager.getKeywordsFromItem(item);

          return {
            title: item.querySelector('.title')?.value || undefined,
            institution: item.querySelector('.institution')?.value || undefined,
            duration: item.querySelector('.duration')?.value || undefined,
            description: item.querySelector('.description')?.value || undefined,
            ...(keywords.length && { keywords }),
          };
        })
        .filter(item => Object.values(item).filter(Boolean).length),
    };
  }
}
