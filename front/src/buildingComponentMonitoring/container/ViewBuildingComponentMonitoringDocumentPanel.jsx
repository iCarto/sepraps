import {useParams} from "react-router-dom";
import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {ViewDocumentPanel} from "base/file/components";

const ViewBuildingComponentMonitoringDocumentPanel = () => {
    const {buildingComponentId: id} = useParams();

    const handleSetFeaturedImage = documentId => {
        return BuildingComponentMonitoringService.updateWithPatch({
            id,
            featured_image: documentId,
        });
    };

    return <ViewDocumentPanel onSetFeaturedImage={handleSetFeaturedImage} />;
};

export default ViewBuildingComponentMonitoringDocumentPanel;
