import {useOutletContext} from "react-router-dom";
import {DateUtil} from "utilities";

import {KeyValue, DetailCard} from "components/common/presentational";

const ProjectAuditSection = () => {
    const project = useOutletContext();

    return (
        <DetailCard title="Datos de auditoría">
            <KeyValue
                label="Creado el:"
                value={DateUtil.formatDate(project[0].created_at)}
                containerWidth="short"
            />
            <KeyValue
                label="Por:"
                value={project[0].creation_user}
                containerWidth="short"
            />
            <KeyValue
                label="Última modificación:"
                value={DateUtil.formatDate(project[0].updated_at)}
                containerWidth="short"
            />
        </DetailCard>
    );
};

export default ProjectAuditSection;
