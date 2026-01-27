export class PersistenceManager {
    static #STORAGE_KEY = 'resume_generator_state';
    static #PERSISTENCE_STATE;

    static set persistenceState(exampleMode) {
        this.#PERSISTENCE_STATE = exampleMode !== 'true';
    }

    static save(data) {
        if (!this.#PERSISTENCE_STATE) return;
        localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(data));
    }

    static async load() {
        if (!this.#PERSISTENCE_STATE) {
            const example = await fetch('src/assets/example.json');

            return example.json();
        }

        const saved = localStorage.getItem(this.#STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    }

    static clear() {
        if (!this.#PERSISTENCE_STATE) return;
        localStorage.removeItem(this.#STORAGE_KEY);
    }
}
