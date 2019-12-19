export default class Session {
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key) {
        const value = localStorage.getItem(key);

        return key === null ? null : JSON.parse(value);
    }

    static has(key) {
        return localStorage.getItem(key) !== null;
    }

    static remove(key) {
        localStorage.removeItem(key);
    }
}
