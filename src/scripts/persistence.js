export class PersistenceManager {
    static #STORAGE_KEY = 'resume_generator_state';

    static save(data) {
        try {
            localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving state to localStorage', e);
        }
    }

    static load() {
        try {
            const saved = localStorage.getItem(this.#STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error('Error loading state from localStorage', e);
            return null;
        }
    }

    static clear() {
        localStorage.removeItem(this.#STORAGE_KEY);
    }
}
