import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService} from "service/api";
import {contract_view_adapter, createContract} from "model";

import {SidebarPanel} from "layout";
import {ProjectFormSearch} from "../../project/presentational";
import {AlertError} from "components/common/presentational";

const AddContractProjectPanel = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSelectedProject = existingProject => {
        setSelectedProject(existingProject);
    };

    const handleProjectToAdd = () => {
        const updatedContract = createContract({
            ...contract,
            projects: [...contract.projects, selectedProject],
        });
        handleFormSubmit(updatedContract);
    };

    const handleFormSubmit = contract => {
        ContractService.updateContract(contract_view_adapter({...contract}))
            .then(() => {
                navigate(`/contracts/${contract.id}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleCloseSidebar = () => {
        navigate(`/contracts/${contract.id}/projects`);
    };

    return (
        <SidebarPanel
            sidebarTitle="Añadir proyecto existente"
            mainActionText="Añadir"
            mainActionClick={handleProjectToAdd}
            closeSidebarClick={handleCloseSidebar}
        >
            <AlertError error={error} />
            <ProjectFormSearch onSelect={handleSelectedProject} />
        </SidebarPanel>
    );
};

export default AddContractProjectPanel;
