import {useEffect, useRef, useState} from "react";
import {DateUtil, NumberUtil} from "base/format/utilities";
import {ImagePreview} from "base/image/components";
import {SectionBox, SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const BuildingComponentMonitoringData = ({buildingComponentMonitoring}) => {
    const [monitoringGridHeight, setMonitoringGridHeight] = useState(0);
    const [previsionGridHeight, setPrevisionGridHeight] = useState(0);

    const monitoringGridRef = useRef(null);
    const previsionGridRef = useRef(null);

    const imageHeight = monitoringGridHeight - previsionGridHeight - 40;

    useEffect(() => {
        if (monitoringGridRef.current) {
            setMonitoringGridHeight(monitoringGridRef.current.clientHeight);
        }
        if (previsionGridRef.current) {
            setPrevisionGridHeight(previsionGridRef.current.clientHeight);
        }
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} spacing={2} height={monitoringGridHeight}>
                <Grid item xs={12} ref={previsionGridRef}>
                    <SectionBox label="Previsión inicial">
                        <SectionField
                            label="Fecha de finalización prevista"
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
                <Grid
                    item
                    lg={12}
                    sx={{
                        display: {xs: "none", lg: "block"},
                    }}
                >
                    <SectionBox>
                        <ImagePreview
                            path={buildingComponentMonitoring?.featured_image}
                            sx={{
                                height: imageHeight,
                                width: "unset",
                            }}
                        />
                    </SectionBox>
                </Grid>
            </Grid>
            <Grid container item xs={6} ref={monitoringGridRef}>
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
