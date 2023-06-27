import {FieldReportProjectActivitiesSection} from ".";
import {AccordionUndercoverLayout, Tag} from "base/shared/components";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const FieldReportProjectsTabPanelContent = ({project}) => {
    return (
        <>
            <Stack flexDirection={"row"} alignItems="center">
                <Typography variant="h5" component="h2" fontWeight="500">
                    {`${project.locality}`}
                </Typography>
                <Tag content={project.contract} />
            </Stack>
            <Typography variant="body2" color="text.secondary">
                {`${project.code} \u2022 ${project.district} (${project.department})`}
            </Typography>

            <AccordionUndercoverLayout
                accordionTitle="Antecedentes"
                defaultExpanded={true}
            >
                {
                    <Typography variant="body1" color="text.primary">
                        {project.history}
                    </Typography>
                }
            </AccordionUndercoverLayout>

            <AccordionUndercoverLayout accordionTitle="Actividades realizadas">
                <FieldReportProjectActivitiesSection activities={project.activities} />
            </AccordionUndercoverLayout>

            <AccordionUndercoverLayout accordionTitle="Acuerdos alcanzados">
                <Typography variant="body1" color="text.primary">
                    {project.agreements}
                </Typography>
            </AccordionUndercoverLayout>
        </>
    );
};

export default FieldReportProjectsTabPanelContent;
