import {SubPageLayout} from "layout";
import {
    ProjectContractSection,
    ProjectFinancingSection,
} from "../presentational/financing";
import Grid from "@mui/material/Grid";

const ViewProjectFinancingSubPage = () => {
    return (
        <SubPageLayout>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectFinancingSection />
                </Grid>
                <Grid item xs={12}>
                    <ProjectContractSection />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectFinancingSubPage;
