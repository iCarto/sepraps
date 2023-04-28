import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {project_view_adapter} from "project/model";
import {ProjectService} from "project/service";

import {SidebarPanel} from "base/ui/sidebar";
import {ProviderForm, ProviderFormSearch} from "provider/presentational/form";
import {AlertError} from "base/error/components";

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
            <AlertError error={error} />
            {action === "search" ? (
                <ProviderFormSearch onSelect={handleSelectExistingProvider} />
            ) : (
                <ProviderForm onSubmit={handleSubmit} />
            )}
        </SidebarPanel>
    );
};

export default AddProjectProviderPanel;
