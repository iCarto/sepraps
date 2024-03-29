import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {createProvider, provider_view_adapter} from "provider/model";
import {ProviderService} from "provider/service";

import {SidebarPanel} from "base/ui/sidebar";
import {ContactForm, ContactFormSearch} from "contact/presentational";
import {AlertError} from "base/error/components";

// TO-DO: Consider removing this component if we are not allowing a provider to be edited from the project
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
                        post_label: data.post_label,
                        ci_number: data.ci_number,
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
        ProviderService.update(provider)
            .then(() => {
                navigate(`/projects/list/${project.id}/location`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleCloseSidebar = () => {
        navigate(`/projects/list/${project.id}/location`);
    };

    const selectedContact =
        action === "edit"
            ? project.provider.contacts.find(
                  contact => contact.id === parseInt(contactId)
              )
            : null;

    const allowedPosts = [
        "presidencia_prestador",
        "vicepresidencia_prestador",
        "tesoreria_prestador",
        "secretaria_prestador",
        "vocal_prestador",
        "otra_prestador",
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
