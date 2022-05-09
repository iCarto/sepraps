import {SectionCard, SectionField} from "components/common/presentational";

const ProjectSection = ({project, headerActions = null}) => {
    return (
        <SectionCard title={project?.name} headerActions={headerActions}>
            <SectionField label="Código:" value={project?.code} />
            <SectionField label="Ubicación:" value={project?.location} />
            <SectionField label="Tipo:" value={project?.project_type_name} />
            <SectionField label="Clase:" value={project?.project_class_name} />
            <SectionField label="Descripción:" value={project?.description} />
        </SectionCard>
    );
};

export default ProjectSection;
