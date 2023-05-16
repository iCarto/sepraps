import {ApiService, AuthService} from "base/api/service";
import FetchError from "base/api/utilities/FetchError";

const handleApiError = error => {
    console.log("API ERROR: " + error);
    if (error instanceof FetchError) {
        let json = error.json();
        if (json !== null) {
            console.log("Json error from API");
            console.log(json);
            if (json.code === "token_not_valid") {
                if (
                    "messages" in json &&
                    "token_class" in json.messages[0] &&
                    json.messages[0].token_class === "AccessToken"
                ) {
                    console.log("ACCESS TOKEN EXPIRED");
                    return AuthService.refreshToken()
                        .then(() => {
                            return true;
                        })
                        .catch(handleApiError);
                } else {
                    console.log("REFRESH TOKEN EXPIRED");
                    return AuthService.logout().then(() => {
                        return false;
                    });
                }
            }
        } else {
            console.log("Generic error from API");
            console.log(error);
        }
    } else {
        console.log("Generic fetch error");
        console.log(error);
    }
    throw error;
};

const AuthApiService = {
    get(url, headers) {
        return ApiService.get(url, {
            Authorization: "Bearer " + AuthService.getAccessToken(),
            ...headers,
        }).catch(e => {
            return handleApiError(e).then(retryRequest => {
                if (retryRequest) {
                    return AuthApiService.get(url, headers);
                } else {
                    window.location.reload();
                }
            });
        });
    },

    post(url, data, contentType) {
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.post(url, data, contentType, headers).catch(e => {
            return handleApiError(e).then(retryRequest => {
                if (retryRequest) {
                    return AuthApiService.post(url, data, contentType);
                } else {
                    window.location.reload();
                }
            });
        });
    },

    put(url, data) {
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.put(url, data, headers).catch(e => {
            return handleApiError(e).then(retryRequest => {
                if (retryRequest) {
                    return AuthApiService.put(url, data);
                } else {
                    window.location.reload();
                }
            });
        });
    },

    patch(url, data, bulk = false) {
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.patch(url, data, bulk, headers).catch(e => {
            return handleApiError(e).then(retryRequest => {
                if (retryRequest) {
                    return AuthApiService.patch(url, data, bulk);
                } else {
                    window.location.reload();
                }
            });
        });
    },

    delete(url) {
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.delete(url, headers).catch(e => {
            return handleApiError(e).then(retryRequest => {
                if (retryRequest) {
                    return AuthApiService.delete(url);
                } else {
                    window.location.reload();
                }
            });
        });
    },

    upload(file, url, ...rest) {
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.upload(file, url, headers, ...rest);
    },
};

export default AuthApiService;
