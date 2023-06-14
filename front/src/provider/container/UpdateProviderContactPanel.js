import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";

import {ProviderService} from "provider/service";
import {provider_view_adapter, createProvider} from "provider/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ContactForm, ContactFormSearch} from "contact/presentational";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const UpdateProviderContactPanel = () => {
    const {action, contactId} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let provider;
    [provider] = useOutletContext();

    const basePath = `/providers/${provider.id}/contacts`;

    const selectedContact =
        action === "edit"
            ? provider.contacts.find(contact => contact.id === parseInt(contactId))
            : null;

    const allowedPosts = [
        "presidencia_prestador",
        "vicepresidencia_prestador",
        "tesoreria_prestador",
        "secretaria_prestador",
        "vocal_prestador",
        "otra_prestador",
    ];

    const handleSubmit = data => {
        const contacts = [...provider.contacts];
        if (selectedContact) {
            let contactToRemoveIndex = contacts.findIndex(
                contact => contact.id === selectedContact.id
            );
            contacts.splice(contactToRemoveIndex, 1);
        }

        const updatedProvider = createProvider({
            ...provider,
            contacts: [
                ...contacts,
                {
                    id: data.id,
                    name: data.name,
                    post: data.post,
                    post_label: data.post_label,
                    gender: data.gender,
                    phone: data.phone,
                    email: data.email,
                    comments: data.comments,
                },
            ],
        });
        handleFormSubmit(updatedProvider);
    };

    const handleFormSubmit = updatedProvider => {
        ProviderService.update(provider_view_adapter({...updatedProvider}))
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
            title={action === "edit" ? `Modificar contacto` : `Asignar contacto`}
            form={
                contactId === "existing" ? (
                    <ContactFormSearch
                        allowedPosts={allowedPosts}
                        onSubmit={handleSubmit}
                    />
                ) : (
                    <ContactForm
                        contact={selectedContact}
                        allowedPosts={allowedPosts}
                        onSubmit={handleSubmit}
                    />
                )
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateProviderContactPanel;
