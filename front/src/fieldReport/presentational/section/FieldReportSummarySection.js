import {DateUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FieldReportSummarySection = ({fieldReport, secondaryAction = null}) => {
    return (
        <SectionCard>
            <Stack direction="row" justifyContent="space-between" sx={{mb: 2}}>
                <Typography
                    variant="h6"
                    color="grey.700"
                    sx={{fontWeight: "bold", mb: 3}}
                >
                    {fieldReport?.name}
                </Typography>
                <Box sx={{minWidth: "220px", textAlign: "right"}}>
                    {secondaryAction}
                </Box>
            </Stack>
            <SectionField
                label="Fecha del informe"
                value={DateUtil.formatDate(fieldReport.date)}
            />
            <SectionField
                label="Fechas de la intervención"
                value={`${DateUtil.formatDate(
                    fieldReport?.visit_date_start
                )} - ${DateUtil.formatDate(fieldReport?.visit_date_end)}`}
            />
            <SectionField
                label="Elaborado por"
                value={`${fieldReport?.reporting_person}`}
            />
            <SectionField
                label="Otros participantes en la intervención"
                value={fieldReport?.participant_persons?.join(", ")}
            />
            <SectionField
                label="A la atención de"
                value={fieldReport?.reported_persons?.join(", ")}
            />
        </SectionCard>
    );
};

export default FieldReportSummarySection;
