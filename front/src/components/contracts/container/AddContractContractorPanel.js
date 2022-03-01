import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService} from "service/api";
import {contract_view_adapter} from "model";

import {ContractorFormSearch} from "components/contractor/presentational";
import {ContractorForm} from "components/contractor/presentational";
import {SidebarPanel} from "layout";
import Alert from "@mui/material/Alert";

const AddContractContractorPanel = () => {
    const {action} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSubmit = contractor => {
        ContractService.updateContract(
            contract_view_adapter({...contract, contractor: contractor})
        )
            .then(() => {
                navigate(`/contracts/${contract.id}`, true);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
    };

    const handleCancel = () => {
        navigate(`/contracts/${contract.id}`);
    };

    const handleSelectExistingContractor = selectedExistingContractor => {
        handleSubmit(selectedExistingContractor);
    };

    return (
        <SidebarPanel
            sidebarTitle="Añadir contratista"
            closeSidebarClick={handleCancel}
        >
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            {action === "search" ? (
                <ContractorFormSearch onSelect={handleSelectExistingContractor} />
            ) : (
                <ContractorForm onSubmit={handleSubmit} />
            )}
        </SidebarPanel>
    );
};

export default AddContractContractorPanel;
