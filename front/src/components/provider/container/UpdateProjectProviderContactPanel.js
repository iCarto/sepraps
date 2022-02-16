import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {createProvider} from "model";
import {ProviderService} from "service/api";

import {FormContactPanel} from "components/common/form";

const UpdateProjectProviderContactPanel = () => {
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleFormData = data => {
        const updatedProvider = createProvider({
            id: project.provider.id,
            name: project.provider.name,
            area: project.provider.area,
            locality: project.provider.locality.code,
            project: project.id,
            contacts: [
                ...project.provider.contacts,
                {
                    id: data.contact_id,
                    name: data.contact_name,
                    post: data.contact_post,
                    post_name: data.contact_post_name,
                    gender: data.contact_gender,
                    phone: data.contact_phone,
                    email: data.contact_email,
                    comments: data.contact_comments,
                },
            ],
        });
        handleFormSubmit(updatedProvider);
    };

    const handleFormSubmit = provider => {
        ProviderService.updateProvider(provider)
            .then(() => {
                navigate(`/projects/${project.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    return (
        <FormContactPanel
            contextData={project}
            handleFormData={handleFormData}
            error={error}
        />
    );
};

export default UpdateProjectProviderContactPanel;
