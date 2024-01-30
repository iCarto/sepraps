import {ConnectionSummaryBox} from "connection/presentational";
import {TrainingSummaryBox} from "training/presentational";
import Grid from "@mui/material/Grid";

const SocialComponentsTotalsContent = ({trainingsTotals, connection}) => {
    return (
        <Grid container spacing={2}>
            {trainingsTotals && connection ? (
                <>
                    <Grid item xs={6}>
                        <TrainingSummaryBox trainingsTotals={trainingsTotals} />
                    </Grid>

                    <Grid item xs={6}>
                        <ConnectionSummaryBox connection={connection} />
                    </Grid>
                </>
            ) : null}
        </Grid>
    );
};

export default SocialComponentsTotalsContent;
