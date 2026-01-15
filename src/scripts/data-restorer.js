import { KeywordManager } from './keyword-manager.js';

export class DataRestorer {
    static restore(data) {
        if (!data) return;

        // Restore template config
        if (data.templateConfig) {
            this.#restoreTemplateConfig(data.templateConfig);
        }

        // Restore header section
        if (data.headerSection) {
            this.#restoreHeaderSection(data.headerSection);
        }

        // Restore about section
        if (data.aboutSection) {
            this.#restoreAboutSection(data.aboutSection);
        }

        // Restore skills section
        if (data.skillSection) {
            this.#restoreSkillSection(data.skillSection);
        }

        // Restore target section
        if (data.targetSection) {
            this.#restoreTargetSection(data.targetSection);
        }

        // Restore experience section
        if (data.experienceSection) {
            this.#restoreExperienceSection(data.experienceSection);
        }

        // Restore graduation section
        if (data.graduationSection) {
            this.#restoreGraduationSection(data.graduationSection);
        }

        // Restore specialization section
        if (data.specializationSection) {
            this.#restoreSpecializationSection(data.specializationSection);
        }

        // Restore projects section
        if (data.projectSection) {
            this.#restoreProjectSection(data.projectSection);
        }
    }

    static #restoreTemplateConfig(config) {
        const setValue = (id, value) => {
            const element = document.querySelector(id);
            if (element && value !== undefined) {
                if (element.type === 'checkbox') {
                    element.checked = value;
                } else {
                    element.value = value;
                }
            }
        };

        setValue('#templateModel', config.name);
        setValue('#templateLanguage', config.language);
        setValue('#templateMonochrome', config.monochrome);
        setValue('#templateFontColor', config.fontColor);
        setValue('#templateFontSize', config.fontSize);
    }

    static #restoreHeaderSection(header) {
        const setValue = (id, value) => {
            const element = document.querySelector(id);
            if (element && value) element.value = value;
        };

        // Basic header fields
        if (header.header?.name) {
            setValue('#headerName', header.header.name);
        }

        // Contact fields
        if (header.contact) {
            setValue('#headerEmail', header.contact.email?.value);
            setValue('#headerAddress', header.contact.address?.value);
            setValue('#headerWhatsapp', header.contact.whatsapp?.value);
            setValue('#headerGithubDisplay', header.contact.github?.value);
            setValue('#headerGithubUrl', header.contact.github?.ref);
            setValue('#headerLinkedinDisplay', header.contact.linkedin?.value);
            setValue('#headerLinkedinUrl', header.contact.linkedin?.ref);

            // Personal links
            if (header.contact.personal?.length > 0) {
                const container = document.querySelector('#personalLinks');
                const addBtn = document.querySelector('#personalLinksAdd');

                header.contact.personal.forEach(link => {
                    addBtn?.click();
                    const items = container?.querySelectorAll('.item');
                    const lastItem = items?.[items.length - 1];

                    if (lastItem) {
                        const titleInput = lastItem.querySelector('.title');
                        const urlInput = lastItem.querySelector('.url');
                        if (titleInput && link.value) titleInput.value = link.value;
                        if (urlInput && link.ref) urlInput.value = link.ref;
                    }
                });
            }
        }
    }

    static #restoreAboutSection(about) {
        // Restore descriptions
        if (about.descriptions?.length > 0) {
            const container = document.querySelector('#aboutDescriptions');
            const addBtn = document.querySelector('#aboutDescriptionsAdd');

            about.descriptions.forEach(desc => {
                addBtn?.click();
                const items = container?.querySelectorAll('.description-tag textarea');
                const lastItem = items?.[items.length - 1];

                if (lastItem && desc) {
                    lastItem.value = desc;
                }
            });
        }

        // Restore keywords
        if (about.keywords?.length > 0) {
            this.#restoreKeywords('aboutKeywords', about.keywords);
        }
    }

    static #restoreSkillSection(skill) {
        // Restore skills
        if (skill.skills?.length > 0) {
            const container = document.querySelector('#skillsList');
            const addBtn = document.querySelector('#skillsAdd');

            skill.skills.forEach(skillItem => {
                addBtn?.click();
                const items = container?.querySelectorAll('.item');
                const lastItem = items?.[items.length - 1];

                if (lastItem) {
                    const titleInput = lastItem.querySelector('.title');
                    const levelSelect = lastItem.querySelector('.level');
                    if (titleInput && skillItem.title) titleInput.value = skillItem.title;
                    if (levelSelect && skillItem.level) levelSelect.value = skillItem.level;
                }
            });
        }

        // Restore keywords
        if (skill.keywords?.length > 0) {
            this.#restoreKeywords('skillsKeywords', skill.keywords);
        }
    }

    static #restoreTargetSection(target) {
        const positionInput = document.querySelector('#targetPosition');
        if (positionInput && target.position) {
            positionInput.value = target.position;
        }

        // Restore keywords
        if (target.keywords?.length > 0) {
            this.#restoreKeywords('targetKeywords', target.keywords);
        }
    }

    static #restoreExperienceSection(experience) {
        if (experience.experiences?.length > 0) {
            const container = document.querySelector('#experienceList');
            const addBtn = document.querySelector('#experienceAdd');

            experience.experiences.forEach(exp => {
                addBtn?.click();
                const items = container?.querySelectorAll('.item');
                const lastItem = items?.[items.length - 1];

                if (lastItem) {
                    const setValue = (selector, value) => {
                        const el = lastItem.querySelector(selector);
                        if (el && value !== undefined) {
                            if (el.type === 'checkbox') {
                                el.checked = value;
                                // Trigger change event to hide/show endsAt field
                                el.dispatchEvent(new Event('change', { bubbles: true }));
                            } else {
                                el.value = value;
                            }
                        }
                    };

                    setValue('.title', exp.title);
                    setValue('.company', exp.company);
                    setValue('.startsAt', exp.startsAt);
                    setValue('.currently', exp.currently);
                    if (!exp.currently) {
                        setValue('.endsAt', exp.endsAt);
                    }
                    setValue('.description', exp.description);

                    // Restore keywords for this item
                    if (exp.keywords?.length > 0) {
                        const keywordsSub = lastItem.querySelector('.keywords-sub');
                        const keywordsAddBtn = lastItem.querySelector('.keywords-add');

                        exp.keywords.forEach(kw => {
                            keywordsAddBtn?.click();
                            const kwInputs = keywordsSub?.querySelectorAll('.keyword-input');
                            const lastKwInput = kwInputs?.[kwInputs.length - 1];
                            if (lastKwInput) lastKwInput.value = kw;
                        });
                    }
                }
            });
        }
    }

    static #restoreGraduationSection(graduation) {
        if (graduation.graduations?.length > 0) {
            const container = document.querySelector('#graduationList');
            const addBtn = document.querySelector('#graduationAdd');

            graduation.graduations.forEach(grad => {
                addBtn?.click();
                const items = container?.querySelectorAll('.item');
                const lastItem = items?.[items.length - 1];

                if (lastItem) {
                    const setValue = (selector, value) => {
                        const el = lastItem.querySelector(selector);
                        if (el && value !== undefined) {
                            if (el.type === 'checkbox') {
                                el.checked = value;
                                el.dispatchEvent(new Event('change', { bubbles: true }));
                            } else {
                                el.value = value;
                            }
                        }
                    };

                    setValue('.title', grad.title);
                    setValue('.institution', grad.institution);
                    setValue('.startsAt', grad.startsAt);
                    setValue('.currently', grad.currently);
                    if (!grad.currently) {
                        setValue('.endsAt', grad.endsAt);
                    }
                    setValue('.description', grad.description);

                    // Restore keywords for this item
                    if (grad.keywords?.length > 0) {
                        const keywordsSub = lastItem.querySelector('.keywords-sub');
                        const keywordsAddBtn = lastItem.querySelector('.keywords-add');

                        grad.keywords.forEach(kw => {
                            keywordsAddBtn?.click();
                            const kwInputs = keywordsSub?.querySelectorAll('.keyword-input');
                            const lastKwInput = kwInputs?.[kwInputs.length - 1];
                            if (lastKwInput) lastKwInput.value = kw;
                        });
                    }
                }
            });
        }
    }

    static #restoreSpecializationSection(specialization) {
        if (specialization.specializations?.length > 0) {
            const container = document.querySelector('#specializationList');
            const addBtn = document.querySelector('#specializationAdd');

            specialization.specializations.forEach(spec => {
                addBtn?.click();
                const items = container?.querySelectorAll('.item');
                const lastItem = items?.[items.length - 1];

                if (lastItem) {
                    const setValue = (selector, value) => {
                        const el = lastItem.querySelector(selector);
                        if (el && value) el.value = value;
                    };

                    setValue('.title', spec.title);
                    setValue('.institution', spec.institution);
                    setValue('.duration', spec.duration);
                    setValue('.description', spec.description);

                    // Restore keywords for this item
                    if (spec.keywords?.length > 0) {
                        const keywordsSub = lastItem.querySelector('.keywords-sub');
                        const keywordsAddBtn = lastItem.querySelector('.keywords-add');

                        spec.keywords.forEach(kw => {
                            keywordsAddBtn?.click();
                            const kwInputs = keywordsSub?.querySelectorAll('.keyword-input');
                            const lastKwInput = kwInputs?.[kwInputs.length - 1];
                            if (lastKwInput) lastKwInput.value = kw;
                        });
                    }
                }
            });
        }
    }

    static #restoreProjectSection(project) {
        if (project.projects?.length > 0) {
            const container = document.querySelector('#projectsList');
            const addBtn = document.querySelector('#projectsAdd');

            project.projects.forEach(proj => {
                addBtn?.click();
                const items = container?.querySelectorAll('.item');
                const lastItem = items?.[items.length - 1];

                if (lastItem) {
                    const setValue = (selector, value) => {
                        const el = lastItem.querySelector(selector);
                        if (el && value) el.value = value;
                    };

                    setValue('.title', proj.title);
                    setValue('.description', proj.description);
                    setValue('.link-value', proj.link?.value);
                    setValue('.link-ref', proj.link?.ref);

                    // Restore banner if exists
                    if (proj.banner) {
                        const bannerInput = lastItem.querySelector('input[type="file"].banner');
                        if (bannerInput) {
                            bannerInput.dataset.base64 = proj.banner;
                        }
                    }

                    // Restore keywords for this item
                    if (proj.keywords?.length > 0) {
                        const keywordsSub = lastItem.querySelector('.keywords-sub');
                        const keywordsAddBtn = lastItem.querySelector('.keywords-add');

                        proj.keywords.forEach(kw => {
                            keywordsAddBtn?.click();
                            const kwInputs = keywordsSub?.querySelectorAll('.keyword-input');
                            const lastKwInput = kwInputs?.[kwInputs.length - 1];
                            if (lastKwInput) lastKwInput.value = kw;
                        });
                    }
                }
            });
        }
    }

    static #restoreKeywords(containerId, keywords) {
        const container = document.querySelector(`#${containerId}`);
        const addBtn = document.querySelector(`#${containerId}Add`);

        keywords.forEach(keyword => {
            addBtn?.click();
            const kwInputs = container?.querySelectorAll('.keyword-input');
            const lastKwInput = kwInputs?.[kwInputs.length - 1];
            if (lastKwInput) lastKwInput.value = keyword;
        });
    }
}
