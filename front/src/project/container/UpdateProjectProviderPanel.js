import {useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";

import {provider_view_adapter} from "provider/model";
import {ProviderService} from "provider/service";
import {EntityUpdatePanel} from "base/entity/components";
import {ProviderFormSearch} from "provider/presentational/form";

//TO-DO: Consider removing this component if we are only allowing provider to be updated from its own module.
const UpdateProjectProviderPanel = () => {
    const {action, section} = useParams();
    const location = useLocation();
    const basePath = location.pathname.split(section)[0];

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSubmit = provider => {
        ProviderService.update(
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

    const handleFormCancel = () => {
        navigate(basePath);
    };

    return (
        <EntityUpdatePanel
            title={action === "new" ? "Añadir prestador" : "Modificar prestador"}
            form={<ProviderFormSearch onSubmit={handleSubmit} />}
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateProjectProviderPanel;
