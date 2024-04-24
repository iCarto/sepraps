import {useEffect, useState} from "react";
import {Outlet, useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "project/service";
import {RouterUtil} from "base/navigation/utilities";

import {TabContainer} from "base/ui/tab/components";
import Box from "@mui/material/Box";

const ViewProjectSocialComponentSubPage = () => {
    const {id: projectId} = useParams();

    const location = useLocation();
    const basePath = RouterUtil.getPathForSegment(location, "socialcomponents");

    const [project] = useOutletContext();

    const [socialComponentMonitorings, setSocialComponentMonitorings] = useState(null);
    const [connection, setConnection] = useState(null);
    const [error, setError] = useState(null);

    const contextForOutlet = {
        project: project,
        scMonitorings: socialComponentMonitorings,
        connection: connection,
    };

    useEffect(() => {
        ProjectService.getProjectSocialComponents(projectId)
            .then(items => {
                setSocialComponentMonitorings(items);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
        ProjectService.getProjectConnections(projectId)
            .then(items => {
                // TO-DO: A project always has ONLY 1 connection instance. Check data model.
                setConnection(items[0]);
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
            label: "Componentes",
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

export default ViewProjectSocialComponentSubPage;
