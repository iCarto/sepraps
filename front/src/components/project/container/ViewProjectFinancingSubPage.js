import {ProjectFinancingSection} from "../presentational/financing";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ViewProjectFinancingSubPage = () => {
    return (
        <Container maxWidth="lg" sx={{my: 3}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectFinancingSection />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProjectFinancingSubPage;
