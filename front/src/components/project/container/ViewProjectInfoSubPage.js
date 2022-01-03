import {ProjectSectionCard} from "../presentational/subPageElements";
import {
    ProjectSectionAudit,
    ProjectSectionBasicInfo,
    ProjectSectionMonitoring,
    ProjectSectionProvider,
} from "../presentational/infoSubPage";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ViewProjectInfoSubPage = () => {
    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={8} xl={9}>
                    <ProjectSectionCard>
                        <ProjectSectionBasicInfo />
                    </ProjectSectionCard>
                </Grid>
                <Grid item xs={12} lg={4} xl={3}>
                    <ProjectSectionCard>
                        <ProjectSectionMonitoring />
                    </ProjectSectionCard>
                </Grid>
                <Grid item xs={12} lg={7} xl={8}>
                    <ProjectSectionCard>
                        <ProjectSectionProvider />
                    </ProjectSectionCard>
                </Grid>
                <Grid item xs={12} lg={5} xl={4}>
                    <ProjectSectionCard>
                        <ProjectSectionAudit />
                    </ProjectSectionCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProjectInfoSubPage;
