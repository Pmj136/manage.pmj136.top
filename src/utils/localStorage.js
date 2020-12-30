export default {
    set(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    del(key) {
        return localStorage.removeItem(key);
    },
    clear() {
        return localStorage.clear();
    },
};