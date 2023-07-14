import {useState} from "react";
import {useLocation} from "react-router-dom";

import {FieldReportProjectService} from "fieldReportProject/service";
import {fieldReportProject_view_adapter} from "fieldReportProject/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useMenuGenericDeleteAction} from "base/ui/menu/hooks";

import {AccordionUndercoverLayout, Tag} from "base/shared/components";
import {AlertError} from "base/error/components";
import {
    FieldReportProjectActivitiesSection,
    FieldReportProjectAgreementsSection,
    FieldReportProjectHistorySection,
} from ".";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const FieldReportProjectsTabPanelContent = ({fieldReportProject}) => {
    const [activeFormSection, setActiveFormSection] = useState("");
    const [error, setError] = useState("");

    const {dialog: deleteDialog} = useMenuGenericDeleteAction(
        FieldReportProjectService
    );

    const basePath = useLocation();
    const navigate = useNavigateWithReload();

    const handleOpenForm = section => {
        setActiveFormSection(section);
    };

    const handleCloseForm = () => {
        setActiveFormSection("");
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
                setError(error);
            });
    };

    const handleDelete = () => {
        console.log("delete");
    };

    return (
        <>
            {deleteDialog}
            <Stack flexDirection={"row"} alignItems="center">
                <Typography variant="h5" component="h2" fontWeight="500">
                    {`${fieldReportProject.name}`}
                </Typography>
                <Tag
                    content={
                        fieldReportProject.construction_contract_number ||
                        "Sin contrato"
                    }
                />
            </Stack>
            <Typography variant="body2" color="text.secondary">
                {`${fieldReportProject.code} \u2022 ${fieldReportProject.location}`}
            </Typography>

            <AlertError error={error} />

            <AccordionUndercoverLayout
                accordionTitle="Antecedentes"
                defaultExpanded={!!fieldReportProject?.history}
            >
                <FieldReportProjectHistorySection
                    project={fieldReportProject}
                    isFormOpen={activeFormSection === "history"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>

            <AccordionUndercoverLayout
                accordionTitle="Actividades realizadas"
                defaultExpanded={
                    !!fieldReportProject?.field_report_project_activities?.length
                }
            >
                <FieldReportProjectActivitiesSection
                    activities={fieldReportProject.field_report_project_activities}
                    isFormSectionActive={activeFormSection === "activities"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                />
            </AccordionUndercoverLayout>

            <AccordionUndercoverLayout
                accordionTitle="Acuerdos alcanzados"
                defaultExpanded={!!fieldReportProject?.agreements?.length}
            >
                <FieldReportProjectAgreementsSection
                    project={fieldReportProject}
                    isFormOpen={activeFormSection === "agreements"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>

            <Stack flexDirection={"row"} justifyContent="flex-end" mt={3}>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Eliminar proyecto
                </Button>
            </Stack>
        </>
    );
};

export default FieldReportProjectsTabPanelContent;
