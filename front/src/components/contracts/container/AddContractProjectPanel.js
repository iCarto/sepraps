import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService} from "service/api";
import {contract_view_adapter, createContract} from "model";

import {SidebarPanel} from "layout";
import {ProjectFormSearch} from "../../project/presentational";
import Alert from "@mui/material/Alert";

const AddContractProjectPanel = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSelectedProject = existingProject => {
        setSelectedProject(existingProject);
    };

    //TO-DO REVIEW FUNCTION NAME - "addProjectToContract" ?
    const handleProjectToAdd = () => {
        const updatedContract = createContract({
            ...contract,
            projects: [...contract.projects, selectedProject],
        });
        handleFormSubmit(updatedContract);
    };

    //TO-DO REVIEW FUNCTION NAME - "handleContractUpdate"?
    const handleFormSubmit = contract => {
        ContractService.updateContract(contract_view_adapter({...contract}))
            .then(() => {
                navigate(`/contracts/${contract.id}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
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
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            <ProjectFormSearch onSelect={handleSelectedProject} />
        </SidebarPanel>
    );
};

export default AddContractProjectPanel;
