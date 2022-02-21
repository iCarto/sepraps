import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService} from "service/api";
import {createContract} from "model";

import {SidebarPanel} from "layout";
import {ProjectFormSearch} from "../presentational";

import Alert from "@mui/material/Alert";

const UpdateProjectPanel = () => {
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSelectExistingProject = projectToAdd => {
        const updatedContract = createContract({
            ...contract,
            projects: [
                ...contract.projects.map(project => {
                    return project.id;
                }),
                projectToAdd.id,
            ],
        });
        handleFormSubmit(updatedContract);
    };

    const handleFormSubmit = contract => {
        ContractService.updateContract(contract)
            .then(() => {
                navigate(`/contracts/${contract.id}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCancel = () => {
        navigate(`/contracts/${contract.id}/projects`);
    };

    return (
        <SidebarPanel>
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            <ProjectFormSearch
                onSelect={handleSelectExistingProject}
                onCancel={handleCancel}
            />
        </SidebarPanel>
    );
};

export default UpdateProjectPanel;
