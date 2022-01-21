import {useState} from "react";
import {ProjectService} from "service/api";
import {useNavigate} from "react-router-dom";

import {DomainProvider} from "components/common/provider";
import {ProjectForm} from "../presentational";

import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const CreateProjectPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleFormSubmit = project => {
        ProjectService.createProject(project)
            .then(createdProject => {
                navigate(`/project/${createdProject.id}`);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    return (
        <Container component="main" sx={{flexGrow: 1, p: 3}}>
            {
                // Fixed header needs a fixed space between top margin and the top of the child component
                // MUI examples add a empty toolbar to solve this problem
                // TODO: Check if there is a good solution for this
                <Toolbar />
            }
            <Typography variant="h6" sx={{mb: 2}}>
                Registro de proyecto
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <DomainProvider>
                <ProjectForm handleFormSubmit={handleFormSubmit} />
            </DomainProvider>
        </Container>
    );
};

export default CreateProjectPage;
