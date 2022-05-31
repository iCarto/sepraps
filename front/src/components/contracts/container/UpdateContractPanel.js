import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService} from "service/api";
import {contract_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ContractForm} from "../presentational";
import {AlertError} from "components/common/presentational";

const UpdateContractPanel = () => {
    const {section} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSubmit = contract => {
        console.log({contract}, "cuando llega a handleSubmit");
        ContractService.updateContract(contract_view_adapter({...contract}))
            .then(() => {
                navigate(`/contracts/${contract.id}/summary`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleCloseSidebar = () => {
        navigate(`/contracts/${contract.id}/summary`);
    };

    return (
        <SidebarPanel
            sidebarTitle="Modificar contrato"
            closeSidebarClick={handleCloseSidebar}
        >
            <AlertError error={error} />
            <ContractForm updatedSection={section} onSubmit={handleSubmit} />
        </SidebarPanel>
    );
};

export default UpdateContractPanel;
