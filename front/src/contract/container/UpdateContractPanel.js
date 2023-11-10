import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractService} from "contract/service";
import {contract_view_adapter} from "contract/model";

import {ContractForm} from "contract/presentational/form";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const UpdateContractPanel = () => {
    const {section} = useParams();
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const path =
        section === "execution" || section === "postconstruction"
            ? `/contracts/list/${contract.id}/execution`
            : section === "awarding"
            ? `/contracts/list/${contract.id}/awarding`
            : `/contracts/list/${contract.id}/budget`;

    const handleSubmit = contract => {
        ContractService.update(contract_view_adapter({...contract}))
            .then(() => {
                navigate(path, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(path);
    };

    return (
        <EntityUpdatePanel
            title="Modificar contrato"
            form={
                <ContractForm
                    contract={contract}
                    updatedSection={section}
                    onSubmit={handleSubmit}
                    onCancel={handleFormCancel}
                />
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateContractPanel;
