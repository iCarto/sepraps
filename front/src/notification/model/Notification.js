class Notifications extends Array {}

const notification_view_adapter = notification => {
    return notification;
};

const createNotifications = (data = []) => {
    const notifications = Notifications.from(data, notification =>
        createNotification(notification)
    );
    return notifications;
};

const createNotification = ({
    id = null,
    type = "",
    title = "",
    message = "",
    severity = "",
    url = "",
    context = null,
} = {}) => {
    const publicApi = {
        id,
        type,
        title,
        message,
        severity,
        url,
        context,
    };

    return Object.freeze(publicApi);
};

export {createNotification as default, createNotifications, notification_view_adapter};
