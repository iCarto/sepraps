import {useOutletContext} from "react-router-dom";

import {PaperComponent} from "base/shared/components";
import {ConnectionSummaryBox} from "connection/presentational";
import Grid from "@mui/material/Grid";

const ViewConnectionsOverview = () => {
    const {connection} = useOutletContext();

    return (
        <PaperComponent>
            <Grid container>
                <Grid item xs="6">
                    <ConnectionSummaryBox connection={connection} />
                </Grid>
            </Grid>
        </PaperComponent>
    );
};

export default ViewConnectionsOverview;
