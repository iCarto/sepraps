import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractService} from "contract/service";
import {contract_view_adapter, createContract} from "contract/model";

import {ProjectFormSearch} from "project/presentational/form";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const AddContractProjectPanel = () => {
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleProjectToAdd = selectedProject => {
        const updatedContract = createContract({
            ...contract,
            projects: [...contract.projects, selectedProject.id],
        });
        handleFormSubmit(updatedContract);
    };

    const handleFormSubmit = contract => {
        ContractService.update(contract_view_adapter({...contract}))
            .then(() => {
                navigate(`/contracts/list/${contract.id}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(`/contracts/list/${contract.id}/projects`);
    };

    return (
        <EntityUpdatePanel
            title="Añadir proyecto existente"
            form={<ProjectFormSearch onSubmit={handleProjectToAdd} />}
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default AddContractProjectPanel;
