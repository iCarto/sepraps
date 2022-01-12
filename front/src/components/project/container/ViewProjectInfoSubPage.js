import {
    ProjectAuditSection,
    ProjectGeneralDataSection,
    ProjectMonitoringSection,
    ProjectProviderSection,
} from "../presentational/generaldata";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ViewProjectInfoSubPage = () => {
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
                    <ProjectProviderSection />
                </Grid>
                <Grid item xs={12} lg={5} xl={4}>
                    <ProjectAuditSection />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProjectInfoSubPage;
