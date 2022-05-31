import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";
import {project_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ContractFormSearch} from "../presentational";
import {AlertError} from "components/common/presentational";

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
        const updatedProject = project_view_adapter({
            ...project,
            construction_contract: selectedContract,
        });
        ProjectService.updateProject(updatedProject)
            .then(project => {
                navigate(`/projects/${project.id}/financing`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
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
        >
            <AlertError error={error} />
            <ContractFormSearch onSelect={handleSelectedContract} />
        </SidebarPanel>
    );
};

export default AddProjectContractPanel;
