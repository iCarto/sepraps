import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractService} from "contract/service";
import {contract_view_adapter} from "contract/model";

import {ContractorFormSearch, ContractorForm} from "contractor/presentational";
import {AlertError} from "base/error/components";
import {SidebarPanel} from "base/ui/sidebar";

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
                navigate(`/contracts/${contract.id}/summary`, true);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
    };

    const handleCancel = () => {
        navigate(`/contracts/${contract.id}/summary`);
    };

    const handleSelectExistingContractor = selectedExistingContractor => {
        handleSubmit(selectedExistingContractor);
    };

    return (
        <SidebarPanel
            sidebarTitle="Añadir contratista"
            closeSidebarClick={handleCancel}
        >
            <AlertError error={error} />
            {action === "search" ? (
                <ContractorFormSearch onSelect={handleSelectExistingContractor} />
            ) : (
                <ContractorForm onSubmit={handleSubmit} />
            )}
        </SidebarPanel>
    );
};

export default AddContractContractorPanel;
