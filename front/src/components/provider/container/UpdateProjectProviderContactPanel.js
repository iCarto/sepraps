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
            })
        );
        handleFormSubmit(updatedProvider);
    };

    const handleSelectExistingContact = contact => {
        const updatedProvider = createProvider(
            provider_view_adapter({
                ...project.provider,
                contacts: [
                    ...project.provider.contacts,
                    {
                        id: contact.id,
                        name: contact.name,
                        post: contact.post,
                        gender: contact.gender,
                        phone: contact.phone,
                        email: contact.email,
                        comments: contact.comments,
                    },
                ],
            })
        );
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

    const handleCancel = () => {
        navigate(`/projects/${project.id}`);
    };

    const selectedContact =
        action === "edit"
            ? project.provider.contacts.find(
                  contact => contact.id === parseInt(contactId)
              )
            : null;

    return (
        <SidebarPanel>
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            {action === "search" ? (
                <ContactFormSearch
                    onSelect={handleSelectExistingContact}
                    onCancel={handleCancel}
                />
            ) : (
                <ContactForm
                    contact={selectedContact}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}
        </SidebarPanel>
    );
};

export default UpdateProjectProviderContactPanel;
