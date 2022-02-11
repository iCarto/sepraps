import {SubPageLayout} from "layout";
import {
    ProjectInfrastructureSection,
    ProjectLinkedLocalitiesSection,
} from "../presentational/location";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ViewProjectLocationSubPage = () => {
    return (
        <SubPageLayout>
            <Container maxWidth="lg" sx={{my: 3}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ProjectInfrastructureSection />
                    </Grid>
                    <Grid item xs={12}>
                        <ProjectLinkedLocalitiesSection />
                    </Grid>
                </Grid>
            </Container>
        </SubPageLayout>
    );
};

export default ViewProjectLocationSubPage;
