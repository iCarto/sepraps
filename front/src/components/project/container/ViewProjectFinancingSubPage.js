import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";
import {
    ProjectContractSection,
    ProjectFinancingDataSection,
} from "../presentational/financing";
import Grid from "@mui/material/Grid";

const ViewProjectFinancingSubPage = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    let project;
    [project] = useOutletContext();

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    console.log(project.construction_contract, "project.construction_contract");

    return (
        <SubPageLayout
            outletContext={[project]}
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
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
