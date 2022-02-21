import {SubPageLayout} from "layout";
import {
    ProjectInfrastructureSection,
    ProjectLinkedLocalitiesSection,
} from "../presentational/location";

import Grid from "@mui/material/Grid";

const ViewProjectLocationSubPage = () => {
    return (
        <SubPageLayout>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectInfrastructureSection />
                </Grid>
                <Grid item xs={12}>
                    <ProjectLinkedLocalitiesSection />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectLocationSubPage;
