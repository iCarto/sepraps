import {DateUtil, NumberUtil} from "base/format/utilities";
import {SectionBox, SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";
import {COMPONENT_EXECUTION_STATUS_COMPLETED} from "component/config";

const SocialComponentMonitoringData = ({socialComponentMonitoring}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Previsión inicial">
                    <SectionField
                        label="Fecha de finalización prevista"
                        value={DateUtil.formatDate(
                            socialComponentMonitoring.expected_end_date
                        )}
                    />
                </SectionBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Seguimiento">
                    {socialComponentMonitoring.execution_status ===
                    COMPONENT_EXECUTION_STATUS_COMPLETED ? (
                        <SectionField
                            label="Fecha de finalización real"
                            value={DateUtil.formatDate(
                                socialComponentMonitoring.real_end_date
                            )}
                        />
                    ) : null}
                    <SectionField
                        label="Porcentaje de avance"
                        value={NumberUtil.formatDecimal(
                            socialComponentMonitoring.progress_percentage
                        )}
                        unit="%"
                    />
                    <SectionField
                        label="Estado cualitativo"
                        value={socialComponentMonitoring.quality_status_label}
                    />
                </SectionBox>
            </Grid>
        </Grid>
    );
};

export default SocialComponentMonitoringData;
