import {useNavigate, useParams} from "react-router-dom";
import {ProjectService} from "project/service";

import {EntitySummaryPanel} from "base/entity/components/presentational";
import {ProjectSectionFields} from "project/presentational/section";

const ViewProjectPanel = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const getSectionData = project => {
        return <ProjectSectionFields project={project} />;
    };

    const handleClickDetail = () => {
        navigate(`/projects/list/${id}`);
    };

    return (
        <EntitySummaryPanel
            service={ProjectService}
            id={id}
            title="Resumen del proyecto"
            getSectionTitle={project => project?.name}
            getSectionData={getSectionData}
            onClickDetailButton={handleClickDetail}
        />
    );
};

export default ViewProjectPanel;
