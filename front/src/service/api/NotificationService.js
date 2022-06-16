import {createNotifications} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/notifications";

const NotificationService = {
    getNotifications() {
        // TO-DO: Replace by "get" when API for notifications/coming events is ready
        return AuthApiService.getFake(basePath).then(response => {
            return createNotifications(response);
        });
    },
};

export default NotificationService;
