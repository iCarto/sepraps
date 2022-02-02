import {useOutletContext} from "react-router-dom";
import {DateUtil} from "utilities";

import {SectionCard, SectionField} from "components/common/presentational";

const ProjectAuditSection = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Datos de auditoría">
            <SectionField
                label="Fecha creación:"
                value={DateUtil.formatDate(project.created_at)}
            />
            <SectionField label="Usuario creación:" value={project.creation_user} />
            <SectionField
                label="Fecha última modificación:"
                value={DateUtil.formatDate(project.updated_at)}
            />
        </SectionCard>
    );
};

export default ProjectAuditSection;
