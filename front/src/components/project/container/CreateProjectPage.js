import {useState} from "react";
import {ProjectService} from "service/api";
import {useNavigate} from "react-router-dom";

import {project_view_adapter} from "model";
import {PageLayout} from "layout";
import {ProjectForm} from "../presentational";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {AlertError} from "components/common/presentational";

const CreateProjectPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleFormSubmit = project => {
        ProjectService.createProject(project_view_adapter({...project}))
            .then(createdProject => {
                navigate(`/projects/${createdProject.id}/summary`);
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

export default CreateProjectPage;
