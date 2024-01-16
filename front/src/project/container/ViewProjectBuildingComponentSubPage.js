import {useEffect, useMemo, useState} from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
    useParams,
} from "react-router-dom";

import {ProjectService} from "project/service";

import {AlertError} from "base/error/components";
import {PaperContainer} from "base/shared/components";
import {ComponentListSelector} from "component/presentational";
import {TabContainer} from "base/ui/tab/components";
import {SubpageWithSelectorContainer} from "base/ui/main";

const ViewProjectBuildingComponentSubPage = () => {
    const navigate = useNavigate();
    const {id: projectId, buildingComponentId} = useParams();
    const location = useLocation();
    const isRootPath =
        location.pathname.split("/").slice(-1)[0] === "buildingcomponent";

    const [project] = useOutletContext();

    const [error, setError] = useState(null);
    const [buildingComponentMonitorings, setBuildingComponentMonitorings] = useState(
        null
    );

    const defaultBCMonitoringId = useMemo(() => {
        if (buildingComponentMonitorings)
            return buildingComponentMonitorings[0]?.id?.toString();
    }, [buildingComponentMonitorings]);

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
            content: <Outlet context={[project]} />,
        },
        {
            label: "Componentes",
            path: defaultBCMonitoringId,
            content: (
                <SubpageWithSelectorContainer
                    context={[project]}
                    itemsName="componentes de construcción"
                    itemSelector={
                        <ComponentListSelector
                            components={buildingComponentMonitorings}
                            basePath={`/projects/list/${projectId}/buildingcomponent`}
                            selectedComponentId={parseInt(buildingComponentId)}
                        />
                    }
                    noItems={
                        isRootPath &&
                        buildingComponentMonitorings &&
                        buildingComponentMonitorings.length === 0
                    }
                />
            ),
        },
        {
            label: "Análisis",
            path: "analysis",
            content: (
                <SubpageWithSelectorContainer
                    context={[project]}
                    itemSelector={
                        <ComponentListSelector
                            components={buildingComponentMonitorings}
                            basePath={`/projects/list/${projectId}/buildingcomponent`}
                            selectedComponentId={parseInt(buildingComponentId)}
                        />
                    }
                />
            ),
        },
    ];

    return (
        <PaperContainer>
            <AlertError error={error} />
            <TabContainer tabs={tabs} />
        </PaperContainer>
    );
};

export default ViewProjectBuildingComponentSubPage;
