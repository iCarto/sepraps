import {ListBuildingComponentFolder} from ".";
import {SectionCard} from "base/ui/section/components";

const ViewOrUpdateBuildingComponentFilesDataContent = ({
    buildingComponentMonitoring,
}) => {
    return (
        <SectionCard title="Archivos adjuntos">
            <ListBuildingComponentFolder
                folderPath={buildingComponentMonitoring.folder}
                basePath={""}
            />
        </SectionCard>
    );
};

export default ViewOrUpdateBuildingComponentFilesDataContent;
