import ApiService from "./ApiService";

const basePath = "/api/token/";
const userNotFoundMessage =
    "Usuario no encontrado. Inténtelo de nuevo o contacte con su administrador.";
const passwordNotCorrectMessage =
    "Contraseña incorrecta. Inténtelo de nuevo o contacte con su administrador.";

const UserService = {
    fakeLogin(username, password) {
        return ApiService.get("/api/users").then(response => {
            console.log({response});
            var responseData = {
                type: "",
                message: "",
            };
            if (
                response.some(
                    user => user.username === username && user.password === password
                )
            ) {
                return true;
            } else if (
                response.some(
                    user => user.username === username && user.password !== password
                )
            ) {
                responseData.type = "passwordNotCorrect";
                responseData.message = passwordNotCorrectMessage;
                return responseData;
            }
            responseData.type = "userNotFound";
            responseData.message = userNotFoundMessage;
            return responseData;
        });
    },

    login(username, password) {
        return ApiService.post(basePath, {username, password}).then(response => {
            return response;
        });
    },

    refresh(refresh) {
        return ApiService.post(`${basePath}/refresh/`, {refresh}).then(response => {
            return response;
        });
    },
};

export default UserService;
