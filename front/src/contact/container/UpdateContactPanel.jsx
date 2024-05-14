import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";

import {ContactForm, ContactFormSearch} from "contact/presentational";
import {EntityUpdatePanel} from "base/entity/components/presentational";
import {contact_view_adapter} from "contact/model";

const UpdateContactPanel = ({service, basePath, allowedPosts, entityId}) => {
    const {action, contactId} = useParams();

    const [contact, setContact] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    useEffect(() => {
        if (action === "edit") {
            service
                .get(contactId)
                .then(contact => {
                    setContact(contact);
                    console.log({contact});
                })
                .catch(error => {
                    console.log({error});
                    setError(error);
                });
        }
    }, [contactId]);

    const handleSubmit = contact => {
        const submitService =
            action === "edit"
                ? service.update(contact_view_adapter({...contact, entity: entityId}))
                : service.create(entityId, contact_view_adapter({...contact}));
        submitService
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleAddExistingSubmit = existingContact => {
        service
            .create(entityId, {...existingContact})
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
            title="Modificar contacto"
            form={
                contactId === "existing" ? (
                    <ContactFormSearch
                        allowedPosts={allowedPosts}
                        onSubmit={handleAddExistingSubmit}
                    />
                ) : contactId === "new" ? (
                    <ContactForm allowedPosts={allowedPosts} onSubmit={handleSubmit} />
                ) : (
                    contact && (
                        <ContactForm
                            contact={contact}
                            allowedPosts={allowedPosts}
                            onSubmit={handleSubmit}
                        />
                    )
                )
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateContactPanel;
