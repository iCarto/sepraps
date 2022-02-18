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

    const handleSelectExistingProject = project => {
        const updatedContract = createContract({
            ...contract,
            projects: [
                ...contract.projects,
                {
                    id: project.id,
                    name: project.name,
                    code: project.code,
                    featured_image: project.featured_image,
                    phase_name: project.phase_name,
                    project_type: project.project_type,
                    project_class: project.project_class,
                    init_date: project.init_date,
                    locality: project.locality,
                    provider_name: project.provider_name,
                    financing_fund_name: project.financing_fund_name,
                    financing_program_name: project.financing_program_name,
                    created_at: project.created_at,
                    updated_at: project.updated_at,
                },
            ],
        });
        handleFormSubmit(updatedContract);
    };

    const handleFormSubmit = contract => {
        ContractService.updateContract(contract)
            .then(() => {
                navigate(`/contracts/${contract.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCancel = () => {
        navigate(`/contracts/${contract.id}/projects/`);
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
