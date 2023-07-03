import {useState} from "react";
import {AccordionUndercoverLayout, Tag} from "base/shared/components";
import {
    FieldReportProjectActivitiesSection,
    FieldReportProjectAgreementsSection,
    FieldReportProjectHistorySection,
} from ".";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const FieldReportProjectsTabPanelContent = ({project}) => {
    const [openFormSection, setOpenFormSection] = useState(null);

    const handleOpenForm = section => {
        setOpenFormSection(section);
    };

    const handleCloseForm = () => {
        setOpenFormSection(null);
    };

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
                defaultExpanded={!!project.history}
            >
                <FieldReportProjectHistorySection
                    project={project}
                    isFormOpen={openFormSection === "history"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                />
            </AccordionUndercoverLayout>

            <AccordionUndercoverLayout accordionTitle="Actividades realizadas">
                <FieldReportProjectActivitiesSection
                    activities={project.activities}
                    isFormOpen={openFormSection === "activities"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                />
            </AccordionUndercoverLayout>

            <AccordionUndercoverLayout accordionTitle="Acuerdos alcanzados">
                <FieldReportProjectAgreementsSection
                    project={project}
                    isFormOpen={openFormSection === "agreements"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                />
            </AccordionUndercoverLayout>
        </>
    );
};

export default FieldReportProjectsTabPanelContent;
