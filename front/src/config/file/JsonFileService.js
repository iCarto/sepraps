const get = (url = "", headers = {}) =>
    fetch("/data" + url + ".json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }).then(function(response) {
        return response.json();
    });

const post = (url = "", body = {}, contentType = "application/json", headers = {}) =>
    Promise.resolve("Not yet implemented");

const put = (url = "", body = {}, headers = {}) =>
    Promise.resolve("Not yet implemented");

const patch = (url = "", body = {}, headers = {}) =>
    Promise.resolve("Not yet implemented");

const del = (url = "", headers = {}) => Promise.resolve("Not yet implemented");

export default {
    get,
    post,
    put,
    patch,
    delete: del,
};
