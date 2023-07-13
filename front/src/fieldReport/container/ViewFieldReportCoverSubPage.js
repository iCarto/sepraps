import {useState} from "react";
import {useLocation, useOutletContext} from "react-router-dom";

import {FieldReportService} from "fieldReport/service";
import {fieldReport_view_adapter} from "fieldReport/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {AccordionUndercoverLayout, PaperContainer} from "base/shared/components";
import {
    FieldReportGeneralDataSection,
    FieldReportParticipantsSection,
    FieldReportReportedPersonsSection,
} from "fieldReport/presentational/section";
import Typography from "@mui/material/Typography";

const ViewFieldReportCoverSubPage = () => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const [openFormSection, setOpenFormSection] = useState(null);
    const [error, setError] = useState(null);

    const basePath = useLocation();
    const navigate = useNavigateWithReload();

    const handleOpenForm = section => {
        setOpenFormSection(section);
    };

    const handleCloseForm = () => {
        setOpenFormSection(null);
    };

    const handleSubmit = fieldReport => {
        FieldReportService.update(fieldReport_view_adapter({...fieldReport}))
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <PaperContainer>
            <Typography
                variant="h5"
                component="h1"
                pr="12px"
                color="primary.dark"
                fontWeight="500"
            >
                Portada del informe
            </Typography>
            <AccordionUndercoverLayout
                accordionTitle="Datos del informe"
                defaultExpanded={true}
            >
                <FieldReportGeneralDataSection
                    fieldReport={fieldReport}
                    isFormOpen={openFormSection === "basic_data"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>
            <AccordionUndercoverLayout
                accordionTitle="Participante/s en la intervención"
                defaultExpanded={!!fieldReport?.participant_persons?.length}
            >
                <FieldReportParticipantsSection
                    fieldReport={fieldReport}
                    isFormOpen={openFormSection === "participant_persons"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>
            <AccordionUndercoverLayout
                accordionTitle="Responsable/s de aprobación"
                defaultExpanded={!!fieldReport?.reported_persons?.length}
            >
                <FieldReportReportedPersonsSection
                    fieldReport={fieldReport}
                    isFormOpen={openFormSection === "reported_persons"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>
        </PaperContainer>
    );
};

export default ViewFieldReportCoverSubPage;
