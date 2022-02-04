import {useOutletContext} from "react-router-dom";
import Container from "@mui/material/Container";
import {ProjectList} from "components/project/presentational";

const ViewContractProjectsSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        <Container maxWidth="lg" sx={{my: 3}}>
            <ProjectList projects={contract.projects} />
        </Container>
    );
};

export default ViewContractProjectsSubPage;
