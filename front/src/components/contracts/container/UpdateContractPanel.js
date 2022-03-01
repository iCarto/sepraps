import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService} from "service/api";

import {SidebarPanel} from "layout";
import {ContractForm} from "../presentational";
import Alert from "@mui/material/Alert";
import {contract_view_adapter} from "model";

const UpdateContractPanel = () => {
    const {section} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSubmit = contract => {
        ContractService.updateContract(contract_view_adapter({...contract}))
            .then(() => {
                navigate(`/contracts/${contract.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCloseSidebar = () => {
        navigate(`/contracts/${contract.id}`);
    };

    return (
        <SidebarPanel
            sidebarTitle="Modificar contrato"
            closeSidebarClick={handleCloseSidebar}
        >
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            <ContractForm section={section} onSubmit={handleSubmit} />
        </SidebarPanel>
    );
};

export default UpdateContractPanel;
