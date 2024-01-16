import Grid from "@mui/material/Grid";
import ProgressBar from "base/progress/components/ProgressBar";

const BuildingComponentsProgress = ({financialData}) => {
    return (
        <Grid
            container
            sx={{border: 1, borderColor: "lightgrey", borderRadius: 5, p: 2}}
        >
            <Grid item xs={6} p={2} pr={5}>
                <ProgressBar
                    label="Avance financiero"
                    progressValue={financialData.financial_progress_percentage}
                />
            </Grid>
            <Grid item xs={6} p={2} pl={5}>
                <ProgressBar
                    label="Avance físico"
                    progressValue={financialData.physical_progress_percentage}
                />
            </Grid>
        </Grid>
    );
};

export default BuildingComponentsProgress;
