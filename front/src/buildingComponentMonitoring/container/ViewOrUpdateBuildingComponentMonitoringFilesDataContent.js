import {ListBuildingComponentMonitoringFolder} from ".";
import {SectionCard} from "base/ui/section/components";

const ViewOrUpdateBuildingComponentMonitoringFilesDataContent = ({
    buildingComponentMonitoring,
}) => {
    return (
        <SectionCard title="Archivos adjuntos">
            <ListBuildingComponentMonitoringFolder
                folderPath={buildingComponentMonitoring.folder}
                basePath={""}
            />
        </SectionCard>
    );
};

export default ViewOrUpdateBuildingComponentMonitoringFilesDataContent;
