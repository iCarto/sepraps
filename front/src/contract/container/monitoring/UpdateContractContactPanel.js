import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";

import {ContractService} from "contract/service";
import {contract_view_adapter, createContract} from "contract/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ContactForm, ContactFormSearch} from "contact/presentational";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const UpdateContractContactPanel = () => {
    const {action, contactId} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const basePath = `/contracts/${contract.id}/monitoring`;

    const selectedContact =
        action === "edit"
            ? contract.contacts.find(contact => contact.id === parseInt(contactId))
            : null;

    const allowedPosts = [
        "residente_obra",
        "fiscal_obra",
        "supervisor_obra",
        "coordinador_social",
        "supervisor_social",
        "otro_contacto",
    ];

    const handleSubmit = data => {
        const contacts = [...contract.contacts];
        if (selectedContact) {
            let contactToRemoveIndex = contacts.findIndex(
                contact => contact.id === selectedContact.id
            );
            contacts.splice(contactToRemoveIndex, 1);
        }

        const updatedContract = createContract({
            ...contract,
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
        });
        handleFormSubmit(updatedContract);
    };

    const handleFormSubmit = updatedContract => {
        ContractService.update(contract_view_adapter({...updatedContract}))
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

export default UpdateContractContactPanel;
