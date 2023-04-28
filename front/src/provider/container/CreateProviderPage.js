import {EntityCreatePage} from "base/entity/pages";
import {provider_view_adapter} from "provider/model";
import {ProviderForm} from "provider/presentational/form";
import {ProviderService} from "provider/service";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

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
        navigate(basePath);
    };

    return (
        <EntityCreatePage
            form={
                <ProviderForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
            }
            title="Registro de prestador"
            error={error}
        />
    );
};

export default CreateProviderPage;
