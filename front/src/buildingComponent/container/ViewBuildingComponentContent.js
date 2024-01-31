import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {RouterUtil} from "base/navigation/utilities";

import {SubpageWithSelectorContainer} from "base/ui/main";
import {BuildingComponentContent} from ".";
import {ComponentListSelector} from "component/presentational";
import {ListSelector, ListSelectorItem} from "base/shared/components";
import {getStatusIcon} from "component/presentational/ComponentStatusChip";

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

    console.log({buildingComponentId});

    return (
        <SubpageWithSelectorContainer
            itemsName="componentes de construcción"
            itemSelector={
                <ListSelector
                    title="Componentes"
                    items={bcMonitorings}
                    renderItem={bcComponent => (
                        <ListSelectorItem
                            key={bcComponent.id}
                            heading={bcComponent.name}
                            icon={getStatusIcon(bcComponent.execution_status)}
                            to={`/projects/list/${projectId}/buildingcomponents/${bcComponent.id}`}
                            selected={parseInt(buildingComponentId) === bcComponent.id}
                        />
                    )}
                    basePath={`/projects/list/${projectId}/buildingcomponents`}
                />
            }
            noItems={isRootPath && bcMonitorings && bcMonitorings.length === 0}
            selectorSize={3}
        >
            <BuildingComponentContent
                buildingComponentMonitoring={buildingComponentMonitoring}
            />
        </SubpageWithSelectorContainer>
    );
};

export default ViewBuildingComponentContent;
