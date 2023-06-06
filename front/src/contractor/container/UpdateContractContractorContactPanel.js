import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractorService} from "contractor/service";
import {createContractor} from "contractor/model";

import {ContactForm, ContactFormSearch} from "contact/presentational";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const UpdateContractContractorContactPanel = () => {
    const {action, contactId} = useParams();

    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const basePath = `/contracts/${contract.id}/summary`;

    const selectedContact =
        action === "edit"
            ? contract.contractor.contacts.find(
                  contact => contact.id === parseInt(contactId)
              )
            : null;

    const allowedPosts = ["responsable_contratista", "residente_obra"];

    const handleSubmit = data => {
        const contacts = [...contract.contractor.contacts];
        if (selectedContact) {
            let contactToRemoveIndex = contacts.findIndex(
                contact => contact.id === selectedContact.id
            );
            contacts.splice(contactToRemoveIndex, 1);
        }

        const updatedContractor = createContractor({
            ...contract.contractor,
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
        handleFormSubmit(updatedContractor);
    };

    const handleFormSubmit = contractor => {
        ContractorService.update(contractor)
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
            title="Añadir contacto"
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

export default UpdateContractContractorContactPanel;
