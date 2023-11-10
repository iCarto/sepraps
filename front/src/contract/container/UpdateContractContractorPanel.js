import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractorService} from "contractor/service";
import {contractor_view_adapter} from "contractor/model";

import {ContractorForm} from "contractor/presentational";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const UpdateContractContractorPanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const basePath = `/contracts/list/${contract.id}/awarding`;

    const handleSubmit = contractor => {
        ContractorService.update(
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
