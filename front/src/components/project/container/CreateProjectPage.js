import {useState} from "react";
import {ProjectService} from "service/api";
import {useNavigate} from "react-router-dom";

import {PageLayout} from "layout";
import {DomainProvider} from "components/common/provider";
import {ProjectForm} from "../presentational";

import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";

const CreateProjectPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleFormSubmit = project => {
        ProjectService.createProject(project)
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
                <Typography variant="h6" sx={{mb: 2}}>
                    Registro de proyecto
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <DomainProvider>
                    <ProjectForm handleFormSubmit={handleFormSubmit} />
                </DomainProvider>
            </Container>
        </PageLayout>
    );
};

export default CreateProjectPage;
