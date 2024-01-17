import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";

import {ContentLayoutWithAside} from "base/ui/main";
import {ViewOrUpdateBuildingComponentMonitoringDataContent} from "../../buildingComponentMonitoring/container";
import {ViewOrUpdateBuildingComponentTechnicalDataContent} from "../container";
import {ViewOrUpdateCommentsContent} from "component/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {EntityAuditSection} from "base/entity/components/presentational/sections";

const BuildingComponentContent = ({buildingComponentMonitoring}) => {
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

export default BuildingComponentContent;
