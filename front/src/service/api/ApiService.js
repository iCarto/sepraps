import {dataService} from "config";

const ApiService = {
    get(url, headers = {}) {
        console.log("GET", url);
        return dataService.get(url, headers);
    },

    post(url, data, contentType, headers = {}) {
        console.log("POST", url);
        return dataService.post(url, data, contentType, headers);
    },

    put(url, data, headers = {}) {
        console.log("PUT", url);
        return dataService.put(url, data, headers);
    },

    patch(url, data, bulk = false, headers = {}) {
        console.log("PATCH", url);
        return dataService.patch(
            url,
            data,
            bulk ? {"X-BULK-OPERATION": true, ...headers} : {...headers}
        );
    },

    delete(url, headers = {}) {
        console.log("DELETE", url);
        return dataService.del(url, headers);
    },
};

export default ApiService;
