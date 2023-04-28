import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {SubPageLayout} from "base/ui/main";
import {
    ProjectInfrastructureSection,
    ProjectLinkedLocalitiesSection,
    ProjectProviderSection,
} from "project/presentational/section";

import Grid from "@mui/material/Grid";

const ViewProjectLocationSubPage = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    let project;
    [project] = useOutletContext();

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
                    <ProjectInfrastructureSection />
                </Grid>
                <Grid item xs={12}>
                    <ProjectProviderSection isSidePanelOpen={isSidePanelOpen} />
                </Grid>
                <Grid item xs={12}>
                    <ProjectLinkedLocalitiesSection />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectLocationSubPage;
