import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {RouterUtil} from "base/navigation/utilities";

import {SubpageWithSelectorContainer} from "base/ui/main";
import {BuildingComponentContent} from ".";
import {ComponentListSelector} from "component/presentational";

const ViewBuildingComponentContent = () => {
    const {bcMonitorings} = useOutletContext();
    const {id: projectId, buildingComponentId} = useParams();

    const location = useLocation();
    const isRootPath = RouterUtil.getLastUrlSegment(location) === "buildingcomponents";

    const [buildingComponentMonitoring, setBuildingComponentMonitoring] = useState(
        null
    );

    useEffect(() => {
        setBuildingComponentMonitoring(null);
        BuildingComponentMonitoringService.get(buildingComponentId).then(data => {
            setBuildingComponentMonitoring(data);
        });
    }, [buildingComponentId, location.state?.lastRefreshDate]);

    return (
        <SubpageWithSelectorContainer
            itemsName="componentes de construcción"
            itemSelector={
                <ComponentListSelector
                    components={bcMonitorings}
                    basePath={`/projects/list/${projectId}/buildingcomponents`}
                    selectedComponentId={parseInt(buildingComponentId)}
                />
            }
            noItems={isRootPath && bcMonitorings && bcMonitorings.length === 0}
        >
            <BuildingComponentContent
                buildingComponentMonitoring={buildingComponentMonitoring}
            />
        </SubpageWithSelectorContainer>
    );
};

export default ViewBuildingComponentContent;
