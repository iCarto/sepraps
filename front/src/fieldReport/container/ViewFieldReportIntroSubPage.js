import {useState} from "react";
import {useLocation, useOutletContext} from "react-router-dom";

import {FieldReportService} from "fieldReport/service";
import {fieldReport_view_adapter} from "fieldReport/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {AccordionUndercoverLayout, PaperContainer} from "base/shared/components";
import {
    FieldReportCommentsStartSection,
    FieldReportGoalsSection,
    FieldReportCommentsEndSection,
} from "fieldReport/presentational/section";
import {AlertError} from "base/error/components";
import Typography from "@mui/material/Typography";

const ViewFieldReportIntroSubPage = () => {
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
                Página de introducción al informe
            </Typography>
            <AlertError error={error} />
            <AccordionUndercoverLayout
                accordionTitle="Texto introductorio"
                defaultExpanded={!!fieldReport?.report_comments_start}
            >
                <FieldReportCommentsStartSection
                    fieldReport={fieldReport}
                    isFormOpen={openFormSection === "report_comments_start"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>
            <AccordionUndercoverLayout
                accordionTitle="Objetivos"
                defaultExpanded={!!fieldReport?.goals?.length}
            >
                <FieldReportGoalsSection
                    fieldReport={fieldReport}
                    isFormOpen={openFormSection === "goals"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>
            <AccordionUndercoverLayout
                accordionTitle="Explicación del informe"
                defaultExpanded={!!fieldReport?.report_comments_end}
            >
                <FieldReportCommentsEndSection
                    fieldReport={fieldReport}
                    isFormOpen={openFormSection === "report_comments_end"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>
        </PaperContainer>
    );
};

export default ViewFieldReportIntroSubPage;
