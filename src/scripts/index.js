import { Navigation } from './navigation.js';
import { Header } from './header.js';
import { Skills } from './skills.js';
import { Experience } from './experience.js';
import { Graduation } from './graduation.js';
import { Project } from './projects.js';
import { Specialization } from './specialization.js';
import { KeywordManager } from './keyword-manager.js';
import { Description } from './description.js';
import { FormActions } from './form-actions.js';
import { IframeScaler } from './iframe-scaler.js';
import { PersistenceManager } from './persistence.js';

class Main {
  constructor() {
    this.#initializeComponents();
    this.#setupKeywordManagers();
    this.#setupPersistence();
    this.#setupFormActions();
    this.iframeScaler = new IframeScaler();
  }

  #initializeComponents() {
    this.navigation = new Navigation();
    this.header = new Header();
    this.skills = new Skills();
    this.experience = new Experience();
    this.graduation = new Graduation();
    this.project = new Project();
    this.specialization = new Specialization();
    this.description = new Description();
  }

  #setupKeywordManagers() {
    KeywordManager.setupKeywordContainer('skillsKeywords', 'skillsKeywordsAdd');
    KeywordManager.setupKeywordContainer('aboutKeywords', 'aboutKeywordsAdd');
    KeywordManager.setupKeywordContainer('targetKeywords', 'targetKeywordsAdd');
  }

  #setupFormActions() {
    const sectionManagers = {
      header: this.header,
      skills: this.skills,
      experience: this.experience,
      graduation: this.graduation,
      project: this.project,
      specialization: this.specialization,
      description: this.description,
      keywordManager: KeywordManager,
    };

    new FormActions(sectionManagers).setupAllActions();
  }

  #setupPersistence() {
    const params = new URLSearchParams(globalThis.location.search);
    const example = params.get('example');

    PersistenceManager.persistenceState = example;
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
