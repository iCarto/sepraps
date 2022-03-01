import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {project_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ProviderForm, ProviderFormSearch} from "components/provider/presentational";
import Alert from "@mui/material/Alert";
import {ProjectService} from "service/api";

const AddProjectProviderPanel = () => {
    const {action} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSubmit = provider => {
        ProjectService.updateProject(project_view_adapter({...project, provider}))
            .then(() => {
                navigate(`/projects/${project.id}/location`, true);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
    };

    const handleCancel = () => {
        navigate(`/projects/${project.id}/location`);
    };

    const handleSelectExistingProvider = selectedExistingProvider => {
        handleSubmit(selectedExistingProvider);
    };

    return (
        <SidebarPanel sidebarTitle="Añadir prestador" closeSidebarClick={handleCancel}>
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            {action === "search" ? (
                <ProviderFormSearch onSelect={handleSelectExistingProvider} />
            ) : (
                <ProviderForm onSubmit={handleSubmit} />
            )}
        </SidebarPanel>
    );
};

export default AddProjectProviderPanel;
