import {DateUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const FieldReportSummarySection = ({fieldReport, secondaryAction = null}) => {
    return (
        <SectionCard headingLabel={false} secondaryAction={secondaryAction}>
            <Grid sx={{marginTop: secondaryAction ? "-48px" : "0px"}}>
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
            <SectionField label="Autor/a" value={`${fieldReport?.reporting_person}`} />
            <SectionField
                label="Participante/s en la intervención"
                value={fieldReport?.participant_persons?.join(", ")}
            />
            <SectionField
                label="Responsable/s de aprobación"
                value={fieldReport?.reported_persons?.join(", ")}
            />
        </SectionCard>
    );
};

export default FieldReportSummarySection;
