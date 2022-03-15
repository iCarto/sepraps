import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";
import {
    ProjectInfrastructureSection,
    ProjectLinkedLocalitiesSection,
    ProjectProviderSection,
} from "../presentational/location";

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
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectInfrastructureSection isSidePanelOpen={isSidePanelOpen} />
                </Grid>
                <Grid item xs={12}>
                    <ProjectProviderSection isSidePanelOpen={isSidePanelOpen} />
                </Grid>
                <Grid item xs={12}>
                    <ProjectLinkedLocalitiesSection isSidePanelOpen={isSidePanelOpen} />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectLocationSubPage;
