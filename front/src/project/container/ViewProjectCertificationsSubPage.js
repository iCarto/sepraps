import {useEffect, useState} from "react";
import {Outlet, useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "project/service";
import {RouterUtil} from "base/navigation/utilities";

import {TabContainer} from "base/ui/tab/components";
import Box from "@mui/material/Box";

const ViewProjectCertificationsSubPage = () => {
    const {id: projectId} = useParams();

    const location = useLocation();
    const basePath = RouterUtil.getPathForSegment(location, "certifications");

    const [project] = useOutletContext();

    const [certifications, setCertifications] = useState(null);
    const [error, setError] = useState(null);

    const contextForOutlet = {
        project: project,
        certifications: certifications,
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

    const tabs = [
        {
            label: "Vista general",
            path: "overview",
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: "Certificaciones",
            path: "list",
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: "Análisis",
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
