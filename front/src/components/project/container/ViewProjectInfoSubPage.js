import {Outlet, useOutletContext} from "react-router-dom";

import {SubPageLayout} from "components/common/presentational";
import {ProviderSection} from "components/provider/presentational";
import {
    ProjectAuditSection,
    ProjectGeneralDataSection,
    ProjectMonitoringSection,
} from "../presentational/generaldata";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ViewProjectInfoSubPage = () => {
    let project;
    [project] = useOutletContext();

    return (
        <>
            <SubPageLayout>
                <Container maxWidth="lg" sx={{my: 3}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ProjectGeneralDataSection />
                        </Grid>

                        <Grid item xs={12}>
                            <ProviderSection provider={project.provider} />
                        </Grid>
                        <Grid item xs={12}>
                            <ProjectMonitoringSection />
                        </Grid>
                        <Grid item xs={12}>
                            <ProjectAuditSection />
                        </Grid>
                    </Grid>
                </Container>
            </SubPageLayout>
            <Outlet context={[project]} />
        </>
    );
};

export default ViewProjectInfoSubPage;
