import {ConnectionSummaryBox} from "connection/presentational";
import {TrainingSummaryBox} from "training/presentational";
import {SocialComponentsSummaryList} from ".";
import Grid from "@mui/material/Grid";

const SocialComponentsTotalsContent = ({
    socialComponents,
    trainingsTotals,
    connection,
}) => {
    return (
        <Grid container spacing={2}>
            {socialComponents && trainingsTotals && connection ? (
                <>
                    <Grid item xs={6}>
                        <TrainingSummaryBox trainingsTotals={trainingsTotals} />
                    </Grid>

                    <Grid item xs={6}>
                        <ConnectionSummaryBox connection={connection} />
                    </Grid>

                    <Grid item xs={12}>
                        <SocialComponentsSummaryList
                            socialComponents={socialComponents}
                        />
                    </Grid>
                </>
            ) : null}
        </Grid>
    );
};

export default SocialComponentsTotalsContent;
