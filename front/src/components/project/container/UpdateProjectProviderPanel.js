import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProviderService} from "service/api";
import {provider_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ProviderForm} from "components/provider/presentational";
import {AlertError} from "components/common/presentational";

const UpdateProjectProviderPanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSubmit = provider => {
        ProviderService.updateProvider(
            provider_view_adapter({...provider, project: project.id})
        )
            .then(() => {
                navigate("/projects/" + project.id + "/location", true);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
    };

    const handleCancel = () => {
        navigate(`/projects/${project.id}/location`);
    };

    return (
        <SidebarPanel
            sidebarTitle="Modificar prestador"
            closeSidebarClick={handleCancel}
        >
            <AlertError error={error} />
            <ProviderForm provider={project.provider} onSubmit={handleSubmit} />
        </SidebarPanel>
    );
};

export default UpdateProjectProviderPanel;
