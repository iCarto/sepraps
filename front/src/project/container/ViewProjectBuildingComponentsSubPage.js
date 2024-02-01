import {useEffect, useState} from "react";
import {Outlet, useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "project/service";
import {RouterUtil} from "base/navigation/utilities";

import {TabContainer} from "base/ui/tab/components";
import Box from "@mui/material/Box";

const ViewProjectBuildingComponentsSubPage = () => {
    const {id: projectId} = useParams();

    const location = useLocation();
    const basePath = RouterUtil.getPathForSegment(location, "buildingcomponents");

    const [project] = useOutletContext();

    const [error, setError] = useState(null);
    const [buildingComponentMonitorings, setBuildingComponentMonitorings] = useState(
        null
    );

    const contextForOutlet = {
        project: project,
        bcMonitorings: buildingComponentMonitorings,
    };

    useEffect(() => {
        ProjectService.getProjectBuildingComponents(projectId)
            .then(items => {
                setBuildingComponentMonitorings(items);
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

export default ViewProjectBuildingComponentsSubPage;
