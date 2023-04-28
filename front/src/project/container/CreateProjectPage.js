import {useState} from "react";
import {ProjectService} from "project/service";
import {useNavigate} from "react-router-dom";

import {project_view_adapter} from "project/model";
import {PageLayout} from "base/ui/main";
import {ProjectForm} from "project/presentational/form";
import {SectionHeading} from "base/section/components";
import {AlertError} from "base/error/components";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

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

    const handleFormCancel = () => {
        navigate("/projects");
    };

    return (
        <PageLayout>
            <Container maxWidth="md">
                <Paper sx={{p: 3}}>
                    <SectionHeading label={false}>Registro de proyecto</SectionHeading>
                    <AlertError error={error} />
                    <ProjectForm
                        onSubmit={handleFormSubmit}
                        onCancel={handleFormCancel}
                    />
                </Paper>
            </Container>
        </PageLayout>
    );
};

export default CreateProjectPage;
