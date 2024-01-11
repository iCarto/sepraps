import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";

import {ContentLayoutWithAside} from "base/ui/main";
import {ViewOrUpdateBuildingComponentMonitoringDataContent} from "../../buildingComponentMonitoring/container";
import {ViewOrUpdateBuildingComponentTechnicalDataContent} from ".";
import {ViewOrUpdateCommentsContent} from "component/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {EntityAuditSection} from "base/entity/components/presentational/sections";

const ViewBuildingComponentContent = () => {
    const {buildingComponentId} = useParams();

    const [buildingComponentMonitoring, setBuildingComponentMonitoring] = useState(
        null
    );
    const location = useLocation();

    useEffect(() => {
        setBuildingComponentMonitoring(null);
        BuildingComponentMonitoringService.get(buildingComponentId).then(data => {
            setBuildingComponentMonitoring(data);
        });
    }, [buildingComponentId, location.state?.lastRefreshDate]);

    return (
        buildingComponentMonitoring && (
            <ContentLayoutWithAside>
                <ViewOrUpdateBuildingComponentMonitoringDataContent
                    bcMonitoring={buildingComponentMonitoring}
                />
                <ViewOrUpdateBuildingComponentTechnicalDataContent
                    buildingComponent={buildingComponentMonitoring?.building_component}
                />
                <ViewOrUpdateFilesDataContent
                    folderPath={buildingComponentMonitoring.folder}
                />
                <ViewOrUpdateCommentsContent
                    entity={buildingComponentMonitoring}
                    service={BuildingComponentMonitoringService}
                />
                <EntityAuditSection entity={buildingComponentMonitoring} />
            </ContentLayoutWithAside>
        )
    );
};

export default ViewBuildingComponentContent;
