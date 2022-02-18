import {SectionCard, SectionField} from "components/common/presentational";

const ProjectSection = ({project}) => {
    return (
        <SectionCard title="Contacto">
            <SectionField label="Nombre:" value={project.name} />
            <SectionField label="Código:" value={project.code} />
            <SectionField label="Tipo:" value={project.project_type} />
            <SectionField label="Fase:" value={project.phase_name} />
            <SectionField
                label="Ubicación:"
                value={`${project.locality.locality_name}, ${project.locality.district_name} (${project.locality.department_name})`}
            />
        </SectionCard>
    );
};

export default ProjectSection;
