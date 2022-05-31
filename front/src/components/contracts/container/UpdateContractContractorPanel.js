import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractorService} from "service/api";
import {contractor_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {AlertError} from "components/common/presentational";
import {ContractorForm} from "components/contractor/presentational";

const UpdateContractContractorPanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSubmit = contractor => {
        ContractorService.updateContractor(
            contractor_view_adapter({...contractor, contract: contract.id})
        )
            .then(() => {
                navigate("/contracts/" + contract.id + "/summary", true);
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
        <SidebarPanel
            sidebarTitle="Actualizar contratista"
            closeSidebarClick={handleCancel}
        >
            <AlertError error={error} />
            <ContractorForm contractor={contract.contractor} onSubmit={handleSubmit} />
        </SidebarPanel>
    );
};

export default UpdateContractContractorPanel;
