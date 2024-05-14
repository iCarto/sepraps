import {ViewDocumentPanel} from "base/file/components";
import {ProjectService} from "project/service";
import {useParams} from "react-router-dom";

const ViewProjectDocumentPanel = () => {
    const {id} = useParams();

    const handleSetFeaturedImage = documentId => {
        return ProjectService.updateWithPatch({
            id,
            featured_image: documentId,
        });
    };

    return <ViewDocumentPanel onSetFeaturedImage={handleSetFeaturedImage} />;
};

export default ViewProjectDocumentPanel;
