import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {
    ViewOrUpdateProjectInfrastructureContent,
    ViewOrUpdateProjectLinkedLocalitiesContent,
    ViewOrUpdateProjectProviderContent,
    ViewOrUpdateProjectSummaryContent,
} from ".";
import {useEffect, useState} from "react";
import {NotificationsSection} from "notification/presentational";

const ViewProjectGeneralInfoSubPage = () => {
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

    let sections = [
        <ViewOrUpdateProjectSummaryContent project={project} />,
        <ViewOrUpdateProjectProviderContent project={project} />,
        <ViewOrUpdateProjectLinkedLocalitiesContent project={project} />,
        <ViewOrUpdateProjectInfrastructureContent project={project} />,
    ];

    if (providerNotifications.length) {
        sections = [
            <NotificationsSection notifications={providerNotifications} />,
            ...sections,
        ];
    }

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectGeneralInfoSubPage;
