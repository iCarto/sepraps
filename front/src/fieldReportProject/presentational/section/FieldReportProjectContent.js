import {FieldReportProjectActivityCard} from "fieldReportProjectActivity/presentational/section";
import {AccordionUndercoverLayout, BulletList} from "base/shared/components";
import {SectionCard} from "base/ui/section/components";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const FieldReportProjectContent = ({fieldReportProject}) => {
    return (
        <SectionCard>
            <AccordionUndercoverLayout
                accordionTitle="Antecedentes"
                defaultExpanded={!!fieldReportProject?.history}
            >
                <Grid container>
                    <Typography variant="body1" color="text.primary">
                        {fieldReportProject.history}
                    </Typography>
                </Grid>
            </AccordionUndercoverLayout>

            <AccordionUndercoverLayout
                accordionTitle="Actividades realizadas"
                defaultExpanded={
                    !!fieldReportProject?.field_report_project_activities?.length
                }
            >
                {fieldReportProject?.field_report_project_activities?.map(activity => (
                    <FieldReportProjectActivityCard
                        key={activity.id}
                        index={activity.id}
                        activity={activity}
                    />
                ))}
            </AccordionUndercoverLayout>

            <AccordionUndercoverLayout
                accordionTitle="Acuerdos alcanzados"
                defaultExpanded={!!fieldReportProject?.agreements?.length}
            >
                <Grid item xs>
                    <BulletList items={fieldReportProject?.agreements} />
                </Grid>
            </AccordionUndercoverLayout>
        </SectionCard>
    );
};

export default FieldReportProjectContent;
