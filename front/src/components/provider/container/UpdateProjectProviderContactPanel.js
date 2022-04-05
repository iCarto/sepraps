import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProviderService} from "service/api";
import {createProvider, provider_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ContactForm, ContactFormSearch} from "components/contacts/presentational";
import Alert from "@mui/material/Alert";

const UpdateProjectProviderContactPanel = () => {
    const {action, contactId} = useParams();

    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSubmit = data => {
        const updatedProvider = createProvider(
            provider_view_adapter({
                ...project.provider,
                contacts: [
                    ...project.provider.contacts,
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
                setError(error.toString());
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

    const allowedPosts = ["miembro_junta_saneamiento"];

    return (
        <SidebarPanel
            sidebarTitle={
                action === "edit"
                    ? "Modificar contacto del prestador"
                    : "Añadir contacto del prestador"
            }
            closeSidebarClick={handleCloseSidebar}
        >
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            {action === "search" ? (
                <ContactFormSearch
                    allowedPosts={allowedPosts}
                    onSelect={handleSubmit}
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
