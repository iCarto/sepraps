const Storage = {
    set(key, value) {
        localStorage.setItem(key, value);
    },

    get(key) {
        console.log("key", key);
        return localStorage.getItem(key);
    },

    remove(key) {
        localStorage.removeItem(key);
    },
};

export default Storage;
