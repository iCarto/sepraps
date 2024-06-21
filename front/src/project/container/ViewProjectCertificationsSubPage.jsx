import {useEffect, useState} from "react";
import {Outlet, useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "project/service";
import {RouterUtil} from "base/navigation/utilities";

import {TabContainer} from "base/ui/tab/components";
import Box from "@mui/material/Box";

import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";

const ViewProjectCertificationsSubPage = () => {
    const {_} = useLingui();
    const {id: projectId} = useParams();

    const location = useLocation();
    const basePath = RouterUtil.getPathForSegment(location, "certifications");

    const [project, notifications] = useOutletContext();

    const [certifications, setCertifications] = useState(null);
    const [certifNotifications, setCertifNotifications] = useState([]);
    const [error, setError] = useState(null);

    const contextForOutlet = {
        project: project,
        certifications: certifications,
        certifNotifications: certifNotifications,
    };

    useEffect(() => {
        ProjectService.getProjectCertifications(projectId)
            .then(items => {
                setCertifications(items);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
    }, [projectId, location.state?.lastRefreshDate]);

    useEffect(() => {
        if (notifications)
            setCertifNotifications(
                notifications.filter(item =>
                    item.context.section.includes("certifications")
                )
            );
    }, [notifications]);

    const tabs = [
        {
            label: _(msg`Vista general`),
            path: "overview",
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: _(msg`Certificaciones`),
            path: "list",
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: _(msg`Análisis`),
            path: "analysis",
            content: <Outlet context={contextForOutlet} />,
        },
    ];

    return (
        <Box>
            <TabContainer tabs={tabs} error={error} basePath={basePath} />
        </Box>
    );
};

export default ViewProjectCertificationsSubPage;
