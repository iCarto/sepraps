import {ProjectContactsSection} from "../presentational/contacts";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ViewProjectContactsSubPage = () => {
    return (
        <Container maxWidth="lg" sx={{my: 3}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectContactsSection />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProjectContactsSubPage;
