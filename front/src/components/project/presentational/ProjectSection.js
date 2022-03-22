import {
    SectionCard,
    SectionField,
    SectionSubheading,
} from "components/common/presentational";

const ProjectSection = ({project, headerActions = null}) => {
    return (
        <SectionCard title="Proyecto" headerActions={headerActions}>
            <SectionField label="Nombre:" value={project?.name} />
            <SectionField label="Código:" value={project?.code} />
            <SectionField
                label="Tipo:"
                value={
                    project?.project_type
                        ? project.project_type.charAt(0).toUpperCase() +
                          project?.project_type.slice(1)
                        : ""
                }
            />
            <SectionField
                label="Ubicación:"
                value={
                    project?.locality.code !== ""
                        ? `${project?.locality.locality_name}, ${project?.locality.district_name} (${project?.locality.department_name})`
                        : `${project?.main_infrastructure.locality.locality_name}, ${project?.main_infrastructure.locality.district_name} (${project?.main_infrastructure.locality.department_name})`
                }
            />
            <SectionSubheading heading="Financiación" />
            <SectionField label="Fondo:" value={project?.financing_fund_name} />
            <SectionField label="Programa:" value={project?.financing_program_name} />
        </SectionCard>
    );
};

export default ProjectSection;
