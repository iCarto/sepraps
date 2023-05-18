import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {ContractService} from "contract/service";
import {contract_view_adapter} from "contract/model";

import {EntityCreatePage} from "base/entity/components/container";
import {ContractForm} from "contract/presentational/form";

const CreateContractPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.split("/new")[0];

    const [error, setError] = useState("");

    const handleFormSubmit = contract => {
        ContractService.create(contract_view_adapter({...contract}))
            .then(createdContract => {
                navigate(`/contracts/${createdContract.id}/summary`);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(`${basePath}/list`);
    };

    return (
        <EntityCreatePage
            title="Registro de contrato"
            form={
                <ContractForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
            }
            error={error}
        />
    );
};

export default CreateContractPage;
