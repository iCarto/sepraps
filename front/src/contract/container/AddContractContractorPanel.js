import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractService} from "contract/service";
import {contract_view_adapter} from "contract/model";

import {ContractorFormSearch, ContractorForm} from "contractor/presentational";
import {EntityUpdatePanel} from "base/entity/components";

const AddContractContractorPanel = () => {
    const {contractorId} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSubmit = contractor => {
        ContractService.update(
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

    return (
        <EntityUpdatePanel
            title="Añadir contratista"
            form={
                contractorId === "existing" ? (
                    <ContractorFormSearch onSubmit={handleSubmit} />
                ) : (
                    <ContractorForm onSubmit={handleSubmit} />
                )
            }
            onCancel={handleCancel}
            error={error}
        />
    );
};

export default AddContractContractorPanel;
