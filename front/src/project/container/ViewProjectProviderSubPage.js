import {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";

import {ViewOrUpdateProjectProviderContent} from ".";
import {EntityViewSubPage} from "base/entity/components/container";
import {NotificationsSection} from "notification/presentational";

const ViewProjectProviderSubPage = () => {
    let project;
    let notifications;
    [project, notifications] = useOutletContext();

    const [providerNotifications, setProviderNotifications] = useState([]);

    useEffect(() => {
        if (notifications)
            setProviderNotifications(
                notifications.filter(item => item.context.section.includes("provider"))
            );
    }, [notifications]);

    let sections = [<ViewOrUpdateProjectProviderContent project={project} />];

    if (providerNotifications.length) {
        sections = [
            <NotificationsSection notifications={providerNotifications} />,
            ...sections,
        ];
    }

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectProviderSubPage;
