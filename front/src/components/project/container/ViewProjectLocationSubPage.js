import {useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";
import {
    ProjectInfrastructureSection,
    ProjectLinkedLocalitiesSection,
    ProjectProviderSection,
} from "../presentational/location";

import Grid from "@mui/material/Grid";

const ViewProjectLocationSubPage = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SubPageLayout outletContext={[project]}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectInfrastructureSection />
                </Grid>
                <Grid item xs={12}>
                    <ProjectProviderSection />
                </Grid>
                <Grid item xs={12}>
                    <ProjectLinkedLocalitiesSection />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectLocationSubPage;
