import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {SectionCard} from "components/common/presentational";
import {ListFolder} from "components/document/container";
import {FolderViewProvider} from "components/document/provider";

const ViewProjectDocumentsSubPage = () => {
    let project;
    [project] = useOutletContext();

    const [path, setPath] = useState(null);

    const params = useParams();

    useEffect(() => {
        let path = params["*"];
        if (!path) {
            path = project.folder;
        }
        setPath(path);
    }, [params]);

    return (
        <Container maxWidth="lg" sx={{my: 3}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {path && (
                        <SectionCard title="Documentos">
                            <FolderViewProvider>
                                <ListFolder path={path} />
                            </FolderViewProvider>
                        </SectionCard>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProjectDocumentsSubPage;
