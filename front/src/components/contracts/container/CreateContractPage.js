import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ContractService} from "service/api";
import {contract_view_adapter} from "model";

import {PageLayout} from "layout";
import {ContractForm} from "../presentational";
import {AlertError} from "components/common/presentational";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
                    <Typography variant="h6" sx={{mb: 2}}>
                        Registro de contrato
                    </Typography>
                    <AlertError error={error} />
                    <ContractForm onSubmit={handleSubmit} />
                </Paper>
            </Container>
        </PageLayout>
    );
};

export default CreateContractPage;
