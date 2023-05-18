import {DateUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

const ProjectSection = ({project, headerActions = null}) => {
    const getDateInfo = date => {
        if (date) {
            return DateUtil.formatDate(date);
        } else return "Pendiente";
    };

    const milestonesData = project?.milestones
        ? project?.milestones
              .filter(
                  milestone =>
                      milestone.code === "start_of_works" ||
                      milestone.code === "provisional_reception" ||
                      milestone.code === "final_reception"
              )
              .map(milestone => {
                  return {
                      name: milestone.short_name,
                      date: milestone.compliance_date,
                  };
              })
        : [];

    return (
        <SectionCard title={project?.name} headerActions={headerActions}>
            {project.closed ? (
                <SectionField
                    label="Estado"
                    value="archivado"
                    valueCustomStyle={{
                        color: "error.main",
                        textTransform: "uppercase",
                    }}
                />
            ) : null}
            <SectionField label="Código" value={project?.code} />
            <SectionField label="Ubicación" value={project?.location} />
            <SectionField label="Clase" value={project?.project_class_name} />
            <SectionField label="Tipo" value={project?.project_type_name} />
            <SectionField label="Descripción" value={project?.description} />

            <Divider variant="middle" sx={{mx: 0, mt: 3, mb: 4}}>
                <Chip label="Seguimiento" sx={{fontWeight: "light"}} />
            </Divider>

            {milestonesData.map((milestone, index) => {
                return (
                    <SectionField
                        key={index}
                        label={`${milestone.name}`}
                        value={getDateInfo(milestone.date)}
                    />
                );
            })}
        </SectionCard>
    );
};

export default ProjectSection;
