import DateUtil from "utilities/DateUtil";
import {SectionCard, SectionField} from "components/common/presentational";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

const ProjectSection = ({project, headerActions = null}) => {
    const getDateInfo = date => {
        if (date) {
            return DateUtil.formatDate(date);
        } else return "Pendiente";
    };

    console.log("project?.milestones", project?.milestones);

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
            <SectionField label="Código:" value={project?.code} />
            <SectionField label="Ubicación:" value={project?.location} />
            <SectionField label="Tipo:" value={project?.project_type_name} />
            <SectionField label="Clase:" value={project?.project_class_name} />
            <SectionField label="Descripción:" value={project?.description} />

            <Divider variant="middle" sx={{mt: 3, mb: 4}}>
                <Chip label="Seguimiento" sx={{fontWeight: "light"}} />
            </Divider>

            {milestonesData.map((milestone, index) => {
                return (
                    <SectionField
                        key={index}
                        label={`${milestone.name}:`}
                        value={getDateInfo(milestone.date)}
                    />
                );
            })}
        </SectionCard>
    );
};

export default ProjectSection;
