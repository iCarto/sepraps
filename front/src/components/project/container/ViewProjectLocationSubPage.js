import {
    ProjectSectionInfrastructure,
    ProjectSectionLinkedLocalities,
} from "../presentational/locationSubPage";
import {ProjectSectionCard} from "../presentational/subPageElements";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ViewProjectLocationSubPage = () => {
    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectSectionCard>
                        <ProjectSectionInfrastructure />
                    </ProjectSectionCard>
                </Grid>
                <Grid item xs={12}>
                    <ProjectSectionCard>
                        <ProjectSectionLinkedLocalities />
                    </ProjectSectionCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProjectLocationSubPage;
