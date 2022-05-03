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
                value={`${project?.name}, ${project?.location}`}
            />
            <SectionSubheading heading="Financiación" />
            <SectionField label="Fondo:" value={project?.financing_fund_name} />
            <SectionField label="Programa:" value={project?.financing_program_name} />
        </SectionCard>
    );
};

export default ProjectSection;
