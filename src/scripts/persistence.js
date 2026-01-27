export class PersistenceManager {
    static #STORAGE_KEY = 'resume_generator_state';

    initFromUrl() {
        const params = new URLSearchParams(globalThis.location.search);
        const example = params.get("resumeExample");

        if (example) {
            const parsed = JSON.parse(example);
            PersistenceManager.save(parsed);
        }
    }

    static save(data) {
        localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(data));
    }

    static load() {
        const saved = localStorage.getItem(this.#STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    }

    static clear() {
        localStorage.removeItem(this.#STORAGE_KEY);
    }
}

