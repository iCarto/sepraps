import {useState} from "react";
import {ProjectService} from "service/api";
import {useParams} from "react-router-dom";

import {useNavigateWithReload} from "hooks";
import {project_view_adapter} from "model";

import {PageLayout} from "layout";
import {ProjectForm} from "components/project/presentational";
import {AlertError} from "components/common/presentational";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const CreateContractProjectPage = () => {
    const navigate = useNavigateWithReload();

    const [error, setError] = useState("");

    const {id: contractId} = useParams();

    const handleFormSubmit = project => {
        ProjectService.createProject(project_view_adapter({...project}))
            .then(() => {
                navigate(`/contracts/${contractId}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <PageLayout>
            <Container maxWidth="md">
                <Paper sx={{p: 3}}>
                    <Typography variant="h6" sx={{mb: 2}}>
                        Registro de proyecto
                    </Typography>
                    <AlertError error={error} />
                    <ProjectForm onSubmit={handleFormSubmit} />
                </Paper>
            </Container>
        </PageLayout>
    );
};

export default CreateContractProjectPage;
