import {NumberUtil} from "base/format/utilities";
import {ProgressBarSmall} from "base/progress/components";
import {AppraisalChip} from "base/shared/components";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const SocialComponentMonitoringStatusData = ({socialComponentMonitoring}) => {
    return (
        <Grid
            container
            direction="row"
            sx={{
                border: 1,
                borderRadius: 1,
                borderStyle: "solid",
                borderColor: "grey.300",
                backgroundColor: "grey.100",
                pt: 1,
                pb: 2,
                pl: 2,
            }}
        >
            <Grid item xs={7}>
                <ProgressBarSmall
                    label="Porcentaje de avance"
                    progressValue={socialComponentMonitoring.progress_percentage}
                    labelVariant={"subtitle2"}
                />
            </Grid>
            <Grid item xs={0.5}>
                <Divider orientation="vertical" sx={{mt: 0.5}} />
            </Grid>
            <Grid item xs={4.5} pl={2}>
                <Typography
                    component="span"
                    variant="subtitle2"
                    color="text.secondary"
                    lineHeight={1}
                >
                    Estado cualitativo:
                </Typography>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: "60%",
                    }}
                >
                    <AppraisalChip
                        value={socialComponentMonitoring.quality_status}
                        label={socialComponentMonitoring.quality_status_label}
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default SocialComponentMonitoringStatusData;
