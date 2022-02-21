import {useNavigate, useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";
import {AddProjectButton, ProjectList} from "components/project/presentational";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const ViewContractProjectsSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const navigate = useNavigate();

    const handleClickOnCard = projectId => {
        navigate(`project/${projectId}`);
    };

    return (
        <SubPageLayout outletContext={[contract]}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    mb: 4,
                    mr: 3,
                }}
            >
                <AddProjectButton basePath={`/contracts/${contract.id}/projects`} />
            </Box>
            <Container maxWidth="lg" sx={{my: 3}}>
                <ProjectList projects={contract.projects} onClick={handleClickOnCard} />
            </Container>
        </SubPageLayout>
    );
};

export default ViewContractProjectsSubPage;
