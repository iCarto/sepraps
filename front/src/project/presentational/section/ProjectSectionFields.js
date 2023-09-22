import {DateUtil} from "base/format/utilities";
import {SectionField} from "base/ui/section/components";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

const ProjectSectionFields = ({project}) => {
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
        <>
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
            <SectionField label="Clase" value={project?.project_class_label} />
            <SectionField label="Tipo" value={project?.project_type_label} />
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
        </>
    );
};

export default ProjectSectionFields;
