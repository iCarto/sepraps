import {DateUtil, NumberUtil} from "base/format/utilities";
import {SectionBox, SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const BuildingComponentMonitoringData = ({buildingComponentMonitoring}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Previsión inicial">
                    <SectionField
                        label="Fecha de fin prevista"
                        value={DateUtil.formatDate(
                            buildingComponentMonitoring.expected_end_date
                        )}
                    />
                    <SectionField
                        label="Monto previsto"
                        value={NumberUtil.formatInteger(
                            buildingComponentMonitoring.expected_amount
                        )}
                        unit="Gs."
                    />
                </SectionBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Seguimiento">
                    <SectionField
                        label="Fecha de finalización real"
                        value={DateUtil.formatDate(
                            buildingComponentMonitoring.real_end_date
                        )}
                    />
                    <SectionField
                        label="Monto real actual"
                        value={NumberUtil.formatInteger(
                            buildingComponentMonitoring.paid_amount
                        )}
                        unit="Gs."
                    />
                    <SectionField
                        label="Monto pendiente"
                        value={NumberUtil.formatInteger(
                            buildingComponentMonitoring.pending_amount
                        )}
                        unit="Gs."
                    />
                    <SectionField
                        label="Monto total"
                        value={NumberUtil.formatInteger(
                            buildingComponentMonitoring.total_amount
                        )}
                        unit="Gs."
                    />
                    <SectionField
                        label="Porcentaje de avance financiero"
                        value={NumberUtil.formatDecimal(
                            buildingComponentMonitoring.financial_progress_percentage
                        )}
                        unit="%"
                    />
                    <Divider sx={{my: 1}} />
                    <SectionField
                        label="Porcentaje de avance físico"
                        value={NumberUtil.formatDecimal(
                            buildingComponentMonitoring.physical_progress_percentage
                        )}
                        unit="%"
                    />
                    <SectionField
                        label="Estado cualitativo"
                        value={buildingComponentMonitoring.quality_status_label}
                    />
                </SectionBox>
            </Grid>
        </Grid>
    );
};

export default BuildingComponentMonitoringData;
