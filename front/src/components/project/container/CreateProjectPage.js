import {useState} from "react";
import {ProjectService} from "service/api";
import {useNavigate} from "react-router-dom";

import {project_view_adapter} from "model";
import {PageLayout} from "layout";
import {ProjectForm} from "../presentational";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const CreateProjectPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleFormSubmit = project => {
        ProjectService.createProject(project_view_adapter({...project}))
            .then(createdProject => {
                navigate(`/projects/${createdProject.id}`);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    return (
        <PageLayout>
            <Container maxWidth="md">
                <Paper sx={{p: 3}}>
                    <Typography variant="h6" sx={{mb: 2}}>
                        Registro de proyecto
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <ProjectForm onSubmit={handleFormSubmit} />
                </Paper>
            </Container>
        </PageLayout>
    );
};

export default CreateProjectPage;
