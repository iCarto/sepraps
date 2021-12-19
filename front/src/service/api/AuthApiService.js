import {AuthService} from "auth";
import ApiService from "./ApiService";

export const AuthApiService = {
    get(url) {
        console.log("AUTH GET", url);
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.get(url, headers);
    },

    post(url, data, contentType) {
        console.log("AUTH POST", url);
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.post(url, data, contentType, headers);
    },

    put(url, data) {
        console.log("AUTH PUT", url);
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.put(url, data, headers);
    },

    patch(url, data, bulk = false) {
        console.log("AUTH PATCH", url);
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.patch(url, data, bulk, headers);
    },

    delete(url) {
        console.log("AUTH DELETE", url);
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.delete(url, headers);
    },
};

export default AuthApiService;
