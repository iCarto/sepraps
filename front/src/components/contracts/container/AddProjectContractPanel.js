import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";

import {SidebarPanel} from "layout";
import {ContractFormSearch} from "../presentational";

const AddProjectContractPanel = () => {
    const [selectedContract, setSelectedContract] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSelectedContract = existingContract => {
        setSelectedContract(existingContract);
    };

    const handleContractToAdd = () => {
        // TO-DO: COMPLETE
        console.log(selectedContract);
    };

    const handleCloseSidebar = () => {
        navigate(`/projects/${project.id}/financing/`);
    };

    return (
        <SidebarPanel
            sidebarTitle="Añadir contrato existente"
            mainActionText="Añadir"
            mainActionClick={handleContractToAdd}
            closeSidebarClick={handleCloseSidebar}
            error={error}
        >
            <ContractFormSearch onSelect={handleSelectedContract} />
        </SidebarPanel>
    );
};

export default AddProjectContractPanel;
