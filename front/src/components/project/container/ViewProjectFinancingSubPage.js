import {ProjectSectionFinancing} from "../presentational/financingSubPage";
import {ProjectSectionCard} from "../presentational/subPageElements";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ViewProjectFinancingSubPage = () => {
    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectSectionCard>
                        <ProjectSectionFinancing />
                    </ProjectSectionCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProjectFinancingSubPage;
