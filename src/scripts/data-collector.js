import { KeywordManager } from './keyword-manager.js';

export class DataCollector {
  static collect() {
    const templateConfig = {
      name: document.querySelector('#templateModel')?.value || 'default',
      language: document.querySelector('#templateLanguage')?.value || 'ptBr',
      monochrome: document.querySelector('#templateMonochrome')?.checked || undefined,
      fontColor: document.querySelector('#templateFontColor')?.value || '#706f6f',
      fontSize: document.querySelector('#templateFontSize')?.value || 16,
    };

    const headerSection = {
      header: {
        ...(document.querySelector('#headerName')?.value && {
          name: document.querySelector('#headerName')?.value,
        })
      },
      contact: {
        ...(document.querySelector('#headerEmail')?.value && { email: { value: document.querySelector('#headerEmail').value } }),
        ...(document.querySelector('#headerAddress')?.value && { address: { value: document.querySelector('#headerAddress').value } }),
        ...(document.querySelector('#headerWhatsapp')?.value && { whatsapp: { value: document.querySelector('#headerWhatsapp').value.replaceAll(/\D/g, '') } }),
        ...(document.querySelector('#headerGithubDisplay')?.value && {
          github: {
            value: document.querySelector('#headerGithubDisplay').value,
            ref: document.querySelector('#headerGithubUrl').value
          }
        }),
        ...(document.querySelector('#headerLinkedinDisplay')?.value && {
          linkedin: {
            value: document.querySelector('#headerLinkedinDisplay')?.value,
            ref: document.querySelector('#headerLinkedinUrl')?.value
          }
        }),
        personal: Array.from(document.querySelectorAll('#personalLinks .item'))?.map(item => ({
          value: document.querySelector('.title', item)?.value || undefined,
          ref: document.querySelector('.url', item)?.value || undefined,
        }))?.filter(link => link.value || link.ref),
      },
    };

    const aboutSection = {
      descriptions: Array.from(document.querySelectorAll('#aboutDescriptions .description-tag'))
        ?.map(input => input.value?.trim())
        .filter(Boolean),
      keywords: KeywordManager.getKeywordsFromContainer('aboutKeywords'),
    };

    const skillSection = {
      skills: Array.from(document.querySelectorAll('#skillsList .item'))?.map(item => ({
        title: item.querySelector('.title', item)?.value || undefined,
        level: item.querySelector('.level', item)?.value || undefined,
      }))?.filter(skill => skill.title && skill.level),
      keywords: KeywordManager.getKeywordsFromContainer('skillsKeywords'),
    };

    const targetSection = {
      position: document.querySelector('#targetPosition')?.value || undefined,
      keywords: KeywordManager.getKeywordsFromContainer('targetKeywords'),
    };

    const experienceSection = {
      experiences: Array.from(document.querySelectorAll('#experienceList .item'))?.map(item => {
        const currently = item.querySelector('.currently', item)?.checked || undefined
        const keywords = KeywordManager.getKeywordsFromItem(item)

        return {
          title: item.querySelector('.title', item)?.value || undefined,
          company: item.querySelector('.company', item)?.value || undefined,
          startsAt: item.querySelector('.startsAt', item)?.value || undefined,
          ...(!currently && { endsAt: item.querySelector('.endsAt', item)?.value || undefined }),
          currently,
          description: item.querySelector('.description', item)?.value || undefined,
          ...(keywords.length && { keywords }),
        };
      })?.filter(item => Object.values(item)?.filter(Boolean)?.length)
    }

    const graduationSection = {
      graduations: Array.from(document.querySelectorAll('#graduationList .item'))?.map(item => {
        const currently = item.querySelector('.currently', item)?.checked || undefined
        const keywords = KeywordManager.getKeywordsFromItem(item)

        return {
          title: item.querySelector('.title', item)?.value || undefined,
          institution: item.querySelector('.institution', item)?.value || undefined,
          startsAt: item.querySelector('.startsAt', item)?.value || undefined,
          ...(!currently && { endsAt: item.querySelector('.endsAt', item)?.value || undefined }),
          currently,
          description: item.querySelector('.description', item)?.value || undefined,
          ...(keywords.length && { keywords }),
        };
      })?.filter(item => Object.values(item)?.filter(Boolean)?.length)
    }

    const projectSection = {
      projects: Array.from(document.querySelectorAll('#projectsList .item'))?.map(item => {
        const keywords = KeywordManager.getKeywordsFromItem(item)

        return {
          title: item.querySelector('.title', item)?.value || undefined,
          description: item.querySelector('.description', item)?.value || undefined,
          banner: item.querySelector(`input[type="file"].banner`, item)?.dataset?.base64 || undefined,
          ...(item.querySelector('.link-value', item)?.value && {
            link: {
              value: item.querySelector('.link-value', item).value,
              ref: item.querySelector('.link-ref', item)?.value || undefined
            }
          }),
          ...(keywords.length && { keywords }),
        }
      })?.filter(item => Object.values(item)?.filter(Boolean)?.length)
    }

    const specializationSection = {
      specializations: Array.from(document.querySelectorAll('#specializationList .item'))?.map(item => {
        const keywords = KeywordManager.getKeywordsFromItem(item)

        return {
          title: item.querySelector('.title', item)?.value || undefined,
          institution: item.querySelector('.institution', item)?.value || undefined,
          duration: item.querySelector('.duration', item)?.value || undefined,
          description: item.querySelector('.description', item)?.value || undefined,
          ...(keywords.length && { keywords }),
        }
      })?.filter(item => Object.values(item)?.filter(Boolean)?.length)
    }

    return {
      templateConfig,
      headerSection,
      aboutSection,
      skillSection,
      targetSection,
      graduationSection,
      specializationSection,
      projectSection,
      experienceSection,
    };
  }
}
