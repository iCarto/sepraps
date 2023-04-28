import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {createProvider, provider_view_adapter} from "provider/model";
import {ProviderService} from "provider/service";

import {SidebarPanel} from "base/ui/sidebar";
import {ContactForm, ContactFormSearch} from "contact/presentational";
import {AlertError} from "base/error/components";

const UpdateProjectProviderContactPanel = () => {
    const {action, contactId} = useParams();

    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSubmit = data => {
        const contacts = [...project.provider.contacts];
        if (selectedContact) {
            let contactToRemoveIndex = contacts.findIndex(
                contact => contact.id === selectedContact.id
            );
            contacts.splice(contactToRemoveIndex, 1);
        }
        const updatedProvider = createProvider(
            provider_view_adapter({
                ...project.provider,
                contacts: [
                    ...contacts,
                    {
                        id: data.id,
                        name: data.name,
                        post: data.post,
                        post_name: data.post_name,
                        gender: data.gender,
                        phone: data.phone,
                        email: data.email,
                        comments: data.comments,
                    },
                ],
            })
        );
        handleFormSubmit(updatedProvider);
    };

    const handleFormSubmit = provider => {
        ProviderService.updateProvider(provider)
            .then(() => {
                navigate(`/projects/${project.id}/location`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleCloseSidebar = () => {
        navigate(`/projects/${project.id}/location`);
    };

    const selectedContact =
        action === "edit"
            ? project.provider.contacts.find(
                  contact => contact.id === parseInt(contactId)
              )
            : null;

    const allowedPosts = [
        "presidencia_junta_saneamiento",
        "tesoreria_junta_saneamiento",
        "secretaria_junta_saneamiento",
        "otra_junta_saneamiento",
    ];

    return (
        <SidebarPanel
            sidebarTitle={
                action === "edit"
                    ? "Modificar contacto del prestador"
                    : "Añadir contacto del prestador"
            }
            closeSidebarClick={handleCloseSidebar}
        >
            <AlertError error={error} />
            {action === "search" ? (
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
            )}
        </SidebarPanel>
    );
};

export default UpdateProjectProviderContactPanel;
