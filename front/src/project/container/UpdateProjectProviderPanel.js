import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {project_view_adapter} from "project/model";
import {ProjectService} from "project/service";

import {EntityUpdatePanel} from "base/entity/components/presentational";
import {ProviderFormSearch} from "provider/presentational/form";

const UpdateProjectProviderPanel = () => {
    const {action} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const basePath = `/projects/${project.id}/provider`;

    const handleSubmit = provider => {
        ProjectService.update(project_view_adapter({...project, provider}))
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
    };

    const handleCancel = () => {
        navigate(basePath);
    };

    return (
        <EntityUpdatePanel
            title={action === "add" ? "Añadir prestador" : "Modificar prestador"}
            form={<ProviderFormSearch onSubmit={handleSubmit} />}
            onCancel={handleCancel}
            error={error}
        />
    );
};

export default UpdateProjectProviderPanel;
