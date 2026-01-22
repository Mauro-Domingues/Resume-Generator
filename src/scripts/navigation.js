export class Navigation {
  #navButtons;
  #panels;

  constructor() {
    this.#navButtons = document.querySelectorAll('#nav button:not([data-ignore])');
    this.#panels = document.querySelectorAll('.panel');
    this.#setupNavigation();
  }

  #setupNavigation() {
    this.#navButtons.forEach(button => {
      button.addEventListener('click', () => {
        const sectionId = button.dataset.section;
        this.#activatePanel(sectionId);
        this.#updateActiveButton(button);
      });
    });
  }

  #activatePanel(sectionId) {
    this.#panels.forEach(panel => panel.classList.remove('active'));
    const targetPanel = document.getElementById(sectionId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  }

  #updateActiveButton(activeButton) {
    this.#navButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }
}
