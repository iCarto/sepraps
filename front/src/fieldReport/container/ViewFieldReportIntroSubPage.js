import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {AccordionUndercoverLayout, PaperContainer} from "base/shared/components";
import {
    FieldReportCommentsStartSection,
    FieldReportGoalsSection,
    FieldReportCommentsEndSection,
} from "fieldReport/presentational/section";
import Typography from "@mui/material/Typography";

const ViewFieldReportIntroSubPage = () => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const [openFormSection, setOpenFormSection] = useState(null);

    const handleOpenForm = section => {
        setOpenFormSection(section);
    };

    const handleCloseForm = () => {
        setOpenFormSection(null);
    };

    const handleSubmit = fieldReport => {
        console.log("handleSubmit", fieldReport);
        // FieldReportService.update(fieldReport_view_adapter({...fieldReport}))
        //     .then(() => {
        //         navigate(basePath, true);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         setError(error);
        //     });
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
            <AccordionUndercoverLayout
                accordionTitle="Texto introductorio"
                defaultExpanded={true}
            >
                <FieldReportCommentsStartSection
                    fieldReport={fieldReport}
                    isFormOpen={openFormSection === "report_comments_start"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>
            <AccordionUndercoverLayout accordionTitle="Objetivos">
                <FieldReportGoalsSection
                    fieldReport={fieldReport}
                    isFormOpen={openFormSection === "goals"}
                    onOpenForm={handleOpenForm}
                    onCloseForm={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            </AccordionUndercoverLayout>
            <AccordionUndercoverLayout accordionTitle="Explicación del informe">
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
