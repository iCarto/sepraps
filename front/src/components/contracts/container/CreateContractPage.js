import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ContractService} from "service/api";
import {contract_view_adapter} from "model";

import {PageLayout} from "layout";
import {ContractForm} from "../presentational";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const CreateContractPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = contract => {
        ContractService.createContract(contract_view_adapter({...contract}))
            .then(createdContract => {
                navigate(`/contracts/${createdContract.id}`);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCancel = () => {
        navigate(`/contracts`);
    };

    return (
        <PageLayout>
            <Container maxWidth="md">
                <Paper sx={{p: 3}}>
                    <Typography variant="h6" sx={{mb: 2}}>
                        Añadir contrato
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <ContractForm onSubmit={handleSubmit} onCancel={handleCancel} />
                </Paper>
            </Container>
        </PageLayout>
    );
};

export default CreateContractPage;
