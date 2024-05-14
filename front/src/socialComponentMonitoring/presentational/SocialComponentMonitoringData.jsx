import {DateUtil} from "base/format/utilities";
import {SocialComponentMonitoringStatusData} from ".";
import {SectionBox, SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";

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
                    <SectionField
                        label="Fecha de finalización real"
                        value={DateUtil.formatDate(
                            socialComponentMonitoring.real_end_date
                        )}
                    />
                </SectionBox>
                <SectionBox label="Estado">
                    <SocialComponentMonitoringStatusData
                        socialComponentMonitoring={socialComponentMonitoring}
                    />
                </SectionBox>
            </Grid>
        </Grid>
    );
};

export default SocialComponentMonitoringData;
