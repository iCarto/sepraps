import {createNotifications} from "notification/model";
import {AuthApiService} from "base/api/service";

const basePath = "/api/app/notifications";

const NotificationService = {
    getNotifications() {
        return AuthApiService.get(basePath).then(response => {
            return createNotifications(response);
        });
    },
};

export default NotificationService;
