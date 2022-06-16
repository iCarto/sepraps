const JsonFileService = {
    get(url = "", headers = {}) {
        url = url.replace(/\/$/, "");
        url = url.split("?")[0];
        console.log("Fetching /api_data" + url + ".json");
        return fetch("/api_data" + url + ".json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then(function (response) {
            return response.json();
        });
    },

    post(url = "", body = {}, contentType = "application/json", headers = {}) {
        return this.get(url, headers);
    },

    put(url = "", body = {}, headers = {}) {
        return Promise.resolve("Not yet implemented");
    },

    patch(url = "", body = {}, headers = {}) {
        return Promise.resolve("Not yet implemented");
    },

    del(url = "", headers = {}) {
        return Promise.resolve("Not yet implemented");
    },
};

export default JsonFileService;
