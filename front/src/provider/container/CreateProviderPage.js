import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {ProviderService} from "provider/service";
import {provider_view_adapter} from "provider/model";

import {EntityCreatePage} from "base/entity/pages";
import {ProviderForm} from "provider/presentational/form";

const CreateProviderPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.split("/new")[0];

    const [error, setError] = useState("");

    const handleFormSubmit = provider => {
        ProviderService.create(provider_view_adapter({...provider}))
            .then(createdProvider => {
                navigate(`${basePath}/${createdProvider.id}/summary`);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(`${basePath}/list`);
    };

    return (
        <EntityCreatePage
            title="Registro de prestador"
            form={
                <ProviderForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
            }
            error={error}
        />
    );
};

export default CreateProviderPage;
