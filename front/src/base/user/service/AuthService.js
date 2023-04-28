import {UserService} from ".";
import {Storage} from "../../shared/utilities";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER} from "../config";

const AuthService = {
    login(username, password) {
        return UserService.login(username, password)
            .then(tokenData => {
                let tokenInfo = JSON.parse(atob(tokenData.access.split(".")[1]));

                let tokenDataToStore = {};
                Object.defineProperty(tokenDataToStore, ACCESS_TOKEN_KEY, {
                    value: tokenData.access,
                    writable: false,
                    enumerable: true,
                    configurable: false,
                });
                Object.defineProperty(tokenDataToStore, REFRESH_TOKEN_KEY, {
                    value: tokenData.refresh,
                    writable: false,
                    enumerable: true,
                    configurable: false,
                });
                Storage.set(USER, JSON.stringify(tokenDataToStore));

                return tokenInfo.username;
            })
            .catch(error => {
                const jsonError = JSON.parse(error.message);
                throw new Error(jsonError.detail);
            });
    },

    refreshToken() {
        const refresh = Storage.get(REFRESH_TOKEN_KEY);
        return UserService.refresh({refresh}).then(tokenData => {
            Storage.set(
                USER,
                JSON.stringify({
                    ACCESS_TOKEN_KEY: tokenData.access,
                    REFRESH_TOKEN_KEY: refresh,
                })
            );
            return tokenData;
        });
    },

    logout() {
        return new Promise((resolve, reject) => {
            Storage.remove(USER);
            resolve(true);
        });
    },

    getAccessToken() {
        const token = Storage.get(USER);
        if (!token) {
            return null;
        }
        const userStoredData = JSON.parse(token);
        return userStoredData[ACCESS_TOKEN_KEY];
    },

    getUsername() {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return null;
        }
        let tokenData = JSON.parse(atob(accessToken.split(".")[1]));
        console.log({tokenData});
        return {
            username: tokenData.username,
            name: tokenData.first_name
                ? `${tokenData.first_name} ${tokenData.last_name}`
                : tokenData.username,
            is_superuser: tokenData.is_superuser,
            roles: tokenData.groups,
        };
    },
};

export default AuthService;
