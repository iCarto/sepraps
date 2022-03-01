import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";
import {project_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ContractFormSearch} from "../presentational";
import Alert from "@mui/material/Alert";

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
        console.log({updatedProject});
        ProjectService.updateProject(updatedProject)
            .then(project => {
                navigate(`/projects/${project.id}/financing`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
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
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            <ContractFormSearch onSelect={handleSelectedContract} />
        </SidebarPanel>
    );
};

export default AddProjectContractPanel;
