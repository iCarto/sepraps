import {DateUtil} from "base/format/utilities";
import {SectionField} from "base/ui/section/components";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
            <Typography
                variant="subtitle2"
                color="grey.700"
                fontWeight="normal"
                sx={{mt: 2}}
            >
                {project?.code}
            </Typography>

            {project?.description ? (
                <Box>
                    <Typography variant="body2">{project?.description}</Typography>
                </Box>
            ) : null}

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
