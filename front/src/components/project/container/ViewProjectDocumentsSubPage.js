import {useParams} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {SectionCard} from "components/common/presentational";
import {ListFolder} from "components/document/container";
import {FolderViewProvider} from "components/document/provider";

const ViewProjectDocumentsSubPage = () => {
    const params = useParams();

    return (
        <Container maxWidth="lg" sx={{my: 3}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SectionCard title="Documentos">
                        <FolderViewProvider>
                            <ListFolder path={params["*"]} />
                        </FolderViewProvider>
                    </SectionCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProjectDocumentsSubPage;
