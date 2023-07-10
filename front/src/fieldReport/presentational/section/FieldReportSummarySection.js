import {DateUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";
import {DownloadPDFButton} from "base/pdf/presentational";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const FieldReportSummarySection = ({fieldReport, handleGeneratePDF}) => {
    const reported_persons = fieldReport?.reported_persons.map(
        person => `${person.name} (${person.role})`
    );
    const other_reporting_persons = fieldReport?.other_reporting_persons.map(
        person => `${person.name} (${person.role})`
    );

    return (
        <SectionCard
            headingLabel={false}
            secondaryAction={
                <DownloadPDFButton
                    handleGeneratePDF={handleGeneratePDF}
                    text="Imprimir informe"
                />
            }
        >
            <Grid sx={{marginTop: "-48px"}}>
                <Typography variant="h4" color="grey.700" sx={{fontWeight: "bold"}}>
                    Informe de viaje {fieldReport.code}
                </Typography>
                <Typography
                    variant="h6"
                    color="grey.700"
                    sx={{fontWeight: "bold", mb: 3}}
                >
                    {fieldReport?.name}
                </Typography>
            </Grid>
            <SectionField
                label="Fechas de la intervención"
                value={`${DateUtil.formatDate(
                    fieldReport?.visit_date_start
                )} - ${DateUtil.formatDate(fieldReport?.visit_date_end)}`}
            />
            <SectionField
                label="Autor/a"
                value={`${fieldReport?.reporting_person_name}, (${fieldReport?.reporting_person_role})`}
            />
            <SectionField
                label="Participante/s en la intervención"
                value={other_reporting_persons?.join(", ")}
            />
            <SectionField
                label="Responsable/s de aprobación"
                value={reported_persons?.join(", ")}
            />
        </SectionCard>
    );
};

export default FieldReportSummarySection;
