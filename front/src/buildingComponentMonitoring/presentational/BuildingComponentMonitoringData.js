import {useEffect, useRef, useState} from "react";
import {DateUtil, NumberUtil} from "base/format/utilities";
import {ImagePreview} from "base/image/components";
import {SectionBox, SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {ProgressBar, ProgressBarSmall} from "base/progress/components";
import Stack from "@mui/material/Stack";
import {LightHeading} from "base/ui/headings/components";
import Paper from "@mui/material/Paper";
import {AppraisalChip} from "base/shared/components";

const BuildingComponentMonitoringData = ({bcMonitoring}) => {
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
                            value={DateUtil.formatDate(bcMonitoring.expected_end_date)}
                        />
                        <SectionField
                            label="Monto previsto"
                            value={NumberUtil.formatInteger(
                                bcMonitoring.expected_amount
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
                            path={bcMonitoring?.featured_image}
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
                        value={DateUtil.formatDate(bcMonitoring.real_end_date)}
                    />
                    <SectionField
                        label="Monto real actual"
                        value={NumberUtil.formatInteger(bcMonitoring.paid_amount)}
                        unit="Gs."
                    />
                    <SectionField
                        label="Monto pendiente"
                        value={NumberUtil.formatInteger(bcMonitoring.pending_amount)}
                        unit="Gs."
                    />
                    <SectionField
                        label="Monto total"
                        value={NumberUtil.formatInteger(bcMonitoring.total_amount)}
                        unit="Gs."
                    />
                    <Divider />
                    <SectionField
                        label="Porcentaje de avance físico"
                        value={NumberUtil.formatDecimal(
                            bcMonitoring.physical_progress_percentage
                        )}
                        unit="%"
                    />
                    <SectionField
                        label="Estado cualitativo"
                        value={bcMonitoring.quality_status_label}
                    />
                    <Paper elevation={1} sx={{mt: 2, p: 2, backgroundColor: "grey.50"}}>
                        <LightHeading>Resultado</LightHeading>
                        <Stack spacing={1} sx={{mt: 1}}>
                            <ProgressBarSmall
                                label="Avance financiero"
                                progressValue={
                                    bcMonitoring.financial_progress_percentage
                                }
                            />
                            <ProgressBarSmall
                                label="Avance físico"
                                progressValue={
                                    bcMonitoring.physical_progress_percentage
                                }
                            />
                        </Stack>
                    </Paper>
                </SectionBox>
            </Grid>
        </Grid>
    );
};

export default BuildingComponentMonitoringData;
