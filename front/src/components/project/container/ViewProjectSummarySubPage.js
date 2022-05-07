import {useState} from "react";
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
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    let project;
    [project] = useOutletContext();

    console.log({project});

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    return (
        <SubPageLayout
            outletContext={[project]}
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
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
