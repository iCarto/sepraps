import {createNotifications} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/notifications";

const NotificationService = {
    getNotifications() {
        return AuthApiService.get(basePath).then(response => {
            return createNotifications(response);
        });
    },
};

export default NotificationService;
