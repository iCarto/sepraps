import {ContainerGridWithBorder} from "base/ui/section/components";
import {ProgressBar} from "base/progress/components";
import Grid from "@mui/material/Grid";

export const NO_BCM_DATA_MESSAGE = "No hay datos suficientes para mostrar el avance";

const BuildingComponentsProgress = ({progressData}) => {
    return (
        <ContainerGridWithBorder>
            <Grid item xs={12} p={2} pr={0}>
                <ProgressBar
                    label="Avance financiero"
                    progressValue={progressData.financial_progress_percentage}
                    tooltipLabel={
                        !progressData.financial_progress_percentage
                            ? NO_BCM_DATA_MESSAGE
                            : null
                    }
                />
            </Grid>
            <Grid item xs={12} p={2} pr={0}>
                <ProgressBar
                    label="Avance físico"
                    progressValue={progressData.physical_progress_percentage}
                    tooltipLabel={
                        !progressData.physical_progress_percentage
                            ? NO_BCM_DATA_MESSAGE
                            : null
                    }
                />
            </Grid>
        </ContainerGridWithBorder>
    );
};

export default BuildingComponentsProgress;
