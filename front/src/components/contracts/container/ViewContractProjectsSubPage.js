import {useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";
import {ProjectList} from "components/project/presentational";
import Container from "@mui/material/Container";

const ViewContractProjectsSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        <SubPageLayout>
            <Container maxWidth="lg" sx={{my: 3}}>
                <ProjectList projects={contract.projects} />
            </Container>
        </SubPageLayout>
    );
};

export default ViewContractProjectsSubPage;
