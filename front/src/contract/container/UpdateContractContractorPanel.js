import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractorService} from "contractor/service";
import {contractor_view_adapter} from "contractor/model";

import {ContractorForm} from "contractor/presentational";
import {EntityUpdatePanel} from "base/entity/components";

const UpdateContractContractorPanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const basePath = `/contracts/${contract.id}/summary`;

    const handleSubmit = contractor => {
        ContractorService.updateContractor(
            contractor_view_adapter({...contractor, contract: contract.id})
        )
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(basePath);
    };

    return (
        <EntityUpdatePanel
            title="Modificar contratista"
            form={
                <ContractorForm
                    contractor={contract.contractor}
                    onSubmit={handleSubmit}
                />
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateContractContractorPanel;
