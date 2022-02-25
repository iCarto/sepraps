import {useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";
import {
    ProjectAuditSection,
    ProjectFinancingSection,
    ProjectGeneralDataSection,
    ProjectLocationSection,
} from "../presentational/generaldata";

import Grid from "@mui/material/Grid";

const ViewProjectSummarySubPage = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SubPageLayout outletContext={[project]}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectGeneralDataSection />
                </Grid>
                <Grid item xs={12}>
                    <ProjectLocationSection />
                </Grid>
                <Grid item xs={12}>
                    <ProjectFinancingSection />
                </Grid>
                <Grid item xs={12}>
                    <ProjectAuditSection />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectSummarySubPage;
