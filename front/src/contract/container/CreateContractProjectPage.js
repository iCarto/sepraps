import {useState} from "react";
import {ProjectService} from "project/service";
import {useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {project_view_adapter} from "project/model";

import {PageLayout} from "base/ui/main";
import {ProjectForm} from "project/presentational/form";
import {SectionHeading} from "base/ui/section/components";
import {AlertError} from "base/error/components";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

const CreateContractProjectPage = () => {
    const navigate = useNavigateWithReload();

    const [error, setError] = useState("");

    const {id: contractId} = useParams();

    const handleFormSubmit = project => {
        ProjectService.create(project_view_adapter({...project}))
            .then(() => {
                navigate(`/contracts/${contractId}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(`/contracts/${contractId}/projects`);
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
                        contractId={contractId}
                    />
                </Paper>
            </Container>
        </PageLayout>
    );
};

export default CreateContractProjectPage;
