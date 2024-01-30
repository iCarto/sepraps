import {useEffect, useMemo, useState} from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
    useParams,
} from "react-router-dom";

import {ProjectService} from "project/service";
import {RouterUtil} from "base/navigation/utilities";

import {TabContainer} from "base/ui/tab/components";
import Box from "@mui/material/Box";

const ViewProjectSocialComponentSubPage = () => {
    const navigate = useNavigate();
    const {id: projectId, socialComponentId, idDocument} = useParams();

    const location = useLocation();
    const isRootPath = RouterUtil.getLastUrlSegment(location) === "socialcomponents";

    const [project] = useOutletContext();

    const [socialComponentMonitorings, setSocialComponentMonitorings] = useState(null);
    const [connection, setConnection] = useState(null);
    const [error, setError] = useState(null);

    const contextForOutlet = {
        project: project,
        scMonitorings: socialComponentMonitorings,
        connection: connection,
    };

    const defaultSCMonitoringId = useMemo(() => {
        if (socialComponentId) return socialComponentId;
        if (socialComponentMonitorings)
            return socialComponentMonitorings[0]?.id?.toString();
    }, [socialComponentId, socialComponentMonitorings]);

    useEffect(() => {
        ProjectService.getProjectSocialComponents(projectId)
            .then(items => {
                setSocialComponentMonitorings(items);
                if (isRootPath && items.length > 0) {
                    navigate(items[0].id.toString());
                }
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
        ProjectService.getProjectConnections(projectId)
            .then(items => {
                // TO-DO: A project always has ONLY 1 connection instance. Check data model.
                setConnection(items[0]);
                if (isRootPath && items.length > 0) {
                    navigate(items[0].id.toString());
                }
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
            path: defaultSCMonitoringId,
            pathsForIndex: [idDocument, "new"],
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: "Conexiones",
            path: "connections",
            pathsForIndex: [idDocument],
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
            <TabContainer tabs={tabs} error={error} />
        </Box>
    );
};

export default ViewProjectSocialComponentSubPage;
