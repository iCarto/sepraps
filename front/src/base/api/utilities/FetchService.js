import FetchError from "./FetchError";

const urlBase = process.env.REACT_APP_API_BASE_URL;

/**
 * @param {string}  url url a la cual consultar
 * esta función detecta si es una nueva url base (comienza con http:// o https://).
 * en caso de ser así, retorna la url. en caso contrario, se asume que es un fragmento
 * de path por lo que se concatena con la constante urlBase
 **/
const readUrl = (url = "") =>
    url.startsWith("http://") || url.startsWith("https://") ? url : `${urlBase}${url}`;

const API_TIMEOUT = 20000;

const fetchTimeout = (url, {...options} = {}) => {
    const controller = new AbortController();
    const promise = fetch(url, {
        signal: controller.signal,
        ...options,
    });
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);
    return promise.finally(() => clearTimeout(timeout));
};

const FetchService = {
    get(url = "", headers = {}, includeCredentials = false, followRedirection = true) {
        let fetchOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...headers,
            },
        };
        if (includeCredentials) {
            fetchOptions["credentials"] = "include";
        }
        if (followRedirection) {
            fetchOptions["redirect"] = "follow";
        }
        return fetchTimeout(readUrl(url), fetchOptions).then(response => {
            if (
                response.status !== 200 &&
                response.status !== 201 &&
                // If we don't follow redirections, return those as we received
                // them (redirections may return status code 0 due to CORS)
                (followRedirection ||
                    (response.status !== 301 &&
                        response.status !== 302 &&
                        response.status !== 0))
            ) {
                return response.text().then(text => {
                    throw new FetchError(text);
                });
            }
            if (
                "headers" in response &&
                response.headers.get("content-type").indexOf("json") >= 0
            ) {
                return response.json();
            }
            return response;
        });
    },

    post(url = "", body = {}, contentType = "application/json", headers = {}) {
        console.log("POST: " + JSON.stringify(body));
        return fetchTimeout(readUrl(url), {
            method: "POST",
            body: contentType === "application/json" ? JSON.stringify(body) : body,
            headers: {
                Accept: "application/json",
                "Content-Type": contentType,
                ...headers,
            },
        }).then(response => {
            console.log(response);
            if (response.status !== 200 && response.status !== 201) {
                return response.text().then(text => {
                    throw new FetchError(text);
                });
            }
            if (response.headers.get("content-type") === "application/json") {
                return response.json();
            }
            return response;
        });
    },

    put(url = "", body = {}, headers = {}) {
        return fetchTimeout(readUrl(url), {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...headers,
            },
        }).then(response => {
            if (response.status !== 200) {
                return response.text().then(text => {
                    throw new FetchError(text);
                });
            }
            if (response.headers.get("content-type") === "application/json") {
                return response.json();
            }
            return response;
        });
    },

    patch(url = "", body = {}, headers = {}) {
        return fetchTimeout(readUrl(url), {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...headers,
            },
        }).then(response => {
            if (response.status !== 200 && response.status !== 204) {
                return response.text().then(text => {
                    throw new FetchError(text);
                });
            }
            if (parseInt(response.headers.get("content-length")) === 0) {
                return true;
            }
            if (response.headers.get("content-type") === "application/json") {
                return response.json();
            }
            return response;
        });
    },

    del(url = "", headers = {}) {
        return fetchTimeout(readUrl(url), {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...headers,
            },
        }).then(response => {
            if (response.status !== 200 && response.status !== 204) {
                return response.text().then(text => {
                    throw new FetchError(text);
                });
            }
            return true;
        });
    },
};

export default FetchService;
