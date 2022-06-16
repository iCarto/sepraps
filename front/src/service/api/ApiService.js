// TO-DO: Remove fakeDataService when API for notifications/coming events is ready
import {fakeDataService} from "config";

import {dataService} from "config";
import {uploadService} from "config";

const ApiService = {
    // TO-DO: Remove fakeDataService when API for notifications/coming events is ready
    getFake(url, headers = {}) {
        console.log("GET", url);
        return fakeDataService.get(url, headers);
    },
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

    upload(file, url, headers = {}, ...rest) {
        console.log("UPLOAD", url);
        return uploadService.upload(
            file,
            url,
            {
                ...headers,
                "Content-Disposition": "attachment; filename=" + file.name,
            },
            ...rest
        );
    },
};

export default ApiService;
