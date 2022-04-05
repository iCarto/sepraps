import {useNavigate, useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";
import {AddProjectButton, ProjectList} from "components/project/presentational";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ViewContractProjectsSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const navigate = useNavigate();

    const handleClickOnCard = projectId => {
        navigate(`project/${projectId}`);
    };

    return (
        <SubPageLayout outletContext={[contract]}>
            <Container maxWidth="lg">
                <Paper sx={{p: 3}}>
                    <Stack direction="row" justifyContent="space-between" sx={{mb: 3}}>
                        <Typography variant="h6">Proyectos del contrato</Typography>
                        <AddProjectButton
                            basePath={`/contracts/${contract.id}/projects`}
                        />
                    </Stack>
                    <ProjectList
                        projects={contract.projects}
                        onClick={handleClickOnCard}
                    />
                </Paper>
            </Container>
        </SubPageLayout>
    );
};

export default ViewContractProjectsSubPage;
