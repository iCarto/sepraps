import {DateUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const FieldReportSummarySection = ({fieldReport, secondaryAction = null}) => {
    return (
        <SectionCard>
            <Stack direction="row" justifyContent="space-between" sx={{mb: 2}}>
                <Typography
                    variant="h5"
                    color="grey.700"
                    sx={{fontWeight: "bold", pb: 2}}
                >
                    {fieldReport?.name}
                </Typography>
                <Box sx={{minWidth: "150px"}}>
                    <Tooltip title="Ver informe completo">
                        <Button
                            aria-label="view-field-report"
                            target="_blank"
                            href={`/field-reports/list/${fieldReport.id}/summary`}
                            variant="contained"
                            startIcon={<OpenInNewIcon />}
                        >
                            Ver informe
                        </Button>
                    </Tooltip>
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
