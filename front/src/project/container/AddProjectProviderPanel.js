import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {project_view_adapter} from "project/model";
import {ProjectService} from "project/service";

import {EntityUpdatePanel} from "base/entity/components";
import {ProviderForm, ProviderFormSearch} from "provider/presentational/form";

const AddProjectProviderPanel = () => {
    const {action, providerId} = useParams();
    const params = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSubmit = provider => {
        ProjectService.update(project_view_adapter({...project, provider}))
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

    return (
        <EntityUpdatePanel
            title={action === "add" ? "Añadir prestador" : "Modificar prestador"}
            form={
                providerId === "existing" ? (
                    <ProviderFormSearch onSubmit={handleSubmit} />
                ) : (
                    <ProviderForm onSubmit={handleSubmit} />
                )
            }
            onCancel={handleCancel}
            error={error}
        />
    );
};

export default AddProjectProviderPanel;
