export class PersistenceManager {
    static #STORAGE_KEY = 'resume_generator_state';

    static save(data) {
        localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(data));
    }

    static async load() {
        const params = new URLSearchParams(globalThis.location.search);
        const example = params.get("example");

        if (example === 'true') {
            const example = await fetch('src/assets/example.json')

            return example.json();
        }

        const saved = localStorage.getItem(this.#STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    }

    static clear() {
        localStorage.removeItem(this.#STORAGE_KEY);
    }
}

