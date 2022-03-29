import {useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";
import {
    ProjectContractSection,
    ProjectFinancingDataSection,
} from "../presentational/financing";
import Grid from "@mui/material/Grid";

const ViewProjectFinancingSubPage = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SubPageLayout outletContext={[project]}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectContractSection contract={project.construction_contract} />
                </Grid>
                <Grid item xs={12}>
                    <ProjectFinancingDataSection />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectFinancingSubPage;
