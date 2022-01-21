import {useOutletContext} from "react-router-dom";
import {
    ProjectAuditSection,
    ProjectGeneralDataSection,
    ProjectMonitoringSection,
} from "../presentational/generaldata";
import {ProviderSection} from "components/provider/presentational";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ViewProjectInfoSubPage = () => {
    let project;
    [project] = useOutletContext();

    return (
        <Container maxWidth="lg" sx={{my: 3}}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={7} xl={8}>
                    <ProjectGeneralDataSection />
                </Grid>
                <Grid item xs={12} lg={5} xl={4}>
                    <ProjectMonitoringSection />
                </Grid>
                <Grid item xs={12} lg={7} xl={8}>
                    <ProviderSection provider={project.provider} />
                </Grid>
                <Grid item xs={12} lg={5} xl={4}>
                    <ProjectAuditSection />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProjectInfoSubPage;
