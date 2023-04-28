import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractorService} from "contractor/service";
import {contractor_view_adapter} from "contractor/model";

import {SidebarPanel} from "base/ui/sidebar";
import {AlertError} from "base/error/components";
import {ContractorForm} from "contractor/presentational";

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
            sidebarTitle="Modificar contratista"
            closeSidebarClick={handleCancel}
        >
            <AlertError error={error} />
            <ContractorForm contractor={contract.contractor} onSubmit={handleSubmit} />
        </SidebarPanel>
    );
};

export default UpdateContractContractorPanel;
