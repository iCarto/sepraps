import {useState} from "react";
import {AccordionUndercoverLayout, Tag} from "base/shared/components";
import {
    FieldReportProjectActivitiesSection,
    FieldReportProjectAgreementsSection,
    FieldReportProjectHistorySection,
} from ".";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {FieldReportProjectService} from "fieldReportProject/service";
import {fieldReportProject_view_adapter} from "fieldReportProject/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useLocation} from "react-router-dom";

const FieldReportProjectsTabPanelContent = ({project}) => {
    const [openFormSection, setOpenFormSection] = useState(null);

    const basePath = useLocation();
    const navigate = useNavigateWithReload();

    const handleOpenForm = section => {
        setOpenFormSection(section);
    };

    const handleCloseForm = () => {
        setOpenFormSection(null);
    };

    const handleSubmit = updatedProject => {
        console.log("handleSubmit", updatedProject);
        FieldReportProjectService.update(
            fieldReportProject_view_adapter({...updatedProject})
        )
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                // setError(error);
            });
    };

    return (
        <>
            <Stack flexDirection={"row"} alignItems="center">
                <Typography variant="h5" component="h2" fontWeight="500">
                    {`${project.name}`}
                </Typography>
                <Tag content={project.construction_contract_number || "Sin contrato"} />
            </Stack>
            <Typography variant="body2" color="text.secondary">
                {`${project.code} \u2022 ${project.location}`}
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
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>

            <AccordionUndercoverLayout accordionTitle="Actividades realizadas">
                <FieldReportProjectActivitiesSection
                    activities={project.field_report_project_activities}
                    isFormOpen={openFormSection === "activities"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>

            <AccordionUndercoverLayout accordionTitle="Acuerdos alcanzados">
                <FieldReportProjectAgreementsSection
                    project={project}
                    isFormOpen={openFormSection === "agreements"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>
        </>
    );
};

export default FieldReportProjectsTabPanelContent;
