import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";

import {SidebarPanel} from "layout";
import {ContractFormSearch} from "../presentational";

import Alert from "@mui/material/Alert";

const UpdateProjectContractPanel = () => {
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSelectExistingContract = contract => {
        // TO-DO: COMPLETE
        console.log(contract);
    };

    const handleCancel = () => {
        navigate(`/projects/${project.id}/financing/`);
    };

    return (
        <SidebarPanel>
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            <ContractFormSearch
                onSelect={handleSelectExistingContract}
                onCancel={handleCancel}
            />
        </SidebarPanel>
    );
};

export default UpdateProjectContractPanel;
