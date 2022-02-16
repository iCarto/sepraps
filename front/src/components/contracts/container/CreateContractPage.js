import {useState} from "react";
import {ContractService} from "service/api";
import {useNavigate} from "react-router-dom";

import {PageLayout} from "layout";
import {ContractForm} from "../presentational";

import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const CreateContractPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = contract => {
        ContractService.createContract(contract)
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
            <Typography variant="h6" sx={{mb: 2}}>
                Añadir contrato
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <ContractForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </PageLayout>
    );
};

export default CreateContractPage;
