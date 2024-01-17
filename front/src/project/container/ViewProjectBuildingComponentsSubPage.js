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

import {PaperContainer} from "base/shared/components";
import {TabContainer} from "base/ui/tab/components";

const ViewProjectBuildingComponentsSubPage = () => {
    const navigate = useNavigate();
    const {id: projectId, buildingComponentId, idDocument} = useParams();

    const location = useLocation();
    const isRootPath = RouterUtil.getLastUrlSegment(location) === "buildingcomponents";

    const [project] = useOutletContext();

    const [error, setError] = useState(null);
    const [buildingComponentMonitorings, setBuildingComponentMonitorings] = useState(
        null
    );

    const contextForOutlet = {
        project: project,
        bcMonitorings: buildingComponentMonitorings,
    };

    const defaultBCMonitoringId = useMemo(() => {
        if (buildingComponentId) return buildingComponentId;
        if (buildingComponentMonitorings)
            return buildingComponentMonitorings[0]?.id?.toString();
    }, [buildingComponentId, buildingComponentMonitorings]);

    useEffect(() => {
        ProjectService.getProjectBuildingComponents(projectId)
            .then(items => {
                setBuildingComponentMonitorings(items);
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
            path: defaultBCMonitoringId,
            pathsForIndex: [idDocument, "new"],
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: "Análisis",
            path: "analysis",
            content: <Outlet context={contextForOutlet} />,
        },
    ];

    return (
        <PaperContainer>
            <TabContainer tabs={tabs} error={error} />
        </PaperContainer>
    );
};

export default ViewProjectBuildingComponentsSubPage;
