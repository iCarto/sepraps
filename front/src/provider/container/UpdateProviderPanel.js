import {useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProviderForm} from "../presentational/form";
import {useNavigateWithReload} from "base/navigation/hooks";
import {provider_view_adapter} from "provider/model";
import {ProviderService} from "provider/service";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const UpdateProviderPanel = () => {
    const {section} = useParams();
    const location = useLocation();
    const basePath = location.pathname.split(section)[0];

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let provider;
    [provider] = useOutletContext();

    const handleSubmit = provider => {
        ProviderService.update(provider_view_adapter({...provider}))
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(basePath);
    };

    return (
        <EntityUpdatePanel
            title="Modificar prestador"
            form={
                <ProviderForm
                    provider={provider}
                    updatedSection={section}
                    onSubmit={handleSubmit}
                    onCancel={handleFormCancel}
                />
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateProviderPanel;
