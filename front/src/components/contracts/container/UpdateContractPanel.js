import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService} from "service/api";

import {SidebarPanel} from "layout";
import {ContractForm} from "../presentational";

const UpdateContractPanel = () => {
    const {section} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSubmit = contract => {
        ContractService.updateContract(contract)
            .then(() => {
                navigate(`/contracts/${contract.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCancel = () => {
        navigate(`/contracts/${contract.id}`);
    };

    return (
        <SidebarPanel>
            <ContractForm
                section={section}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </SidebarPanel>
    );
};

export default UpdateContractPanel;
