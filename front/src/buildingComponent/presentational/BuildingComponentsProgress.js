import Grid from "@mui/material/Grid";
import ProgressBar from "base/progress/components/ProgressBar";
import {ContainerGridWithBorder} from "base/ui/section/components";

const BuildingComponentsProgress = ({financialData}) => {
    return (
        <ContainerGridWithBorder>
            <Grid item xs={12} p={2}>
                <ProgressBar
                    label="Avance financiero"
                    progressValue={financialData.financial_progress_percentage}
                />
            </Grid>
            <Grid item xs={12} p={2}>
                <ProgressBar
                    label="Avance físico"
                    progressValue={financialData.physical_progress_percentage}
                />
            </Grid>
        </ContainerGridWithBorder>
    );
};

export default BuildingComponentsProgress;
