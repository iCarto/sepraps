import {createNotifications} from "notification/model";
import {AuthApiService} from "base/api/service";
import {ServiceUtil} from "base/api/utilities";

const basePath = "/api/app/notifications";

const NotificationService = {
    get(filter) {
        return AuthApiService.get(
            `${basePath}?${ServiceUtil.getFilterQueryString(filter)}`
        ).then(response => {
            return createNotifications(response);
        });
    },
};

export default NotificationService;
