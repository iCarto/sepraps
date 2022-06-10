import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ContractService} from "service/api";
import {contract_view_adapter} from "model";

import {PageLayout} from "layout";
import {ContractForm} from "../presentational";
import {AlertError, SectionHeading} from "components/common/presentational";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

const CreateContractPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = contract => {
        ContractService.createContract(contract_view_adapter({...contract}))
            .then(createdContract => {
                navigate(`/contracts/${createdContract.id}/summary`);
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
                    <SectionHeading label={false}>Registro de contrato</SectionHeading>
                    <AlertError error={error} />
                    <ContractForm onSubmit={handleSubmit} />
                </Paper>
            </Container>
        </PageLayout>
    );
};

export default CreateContractPage;
