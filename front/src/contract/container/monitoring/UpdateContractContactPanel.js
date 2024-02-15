import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";

import {ContactForm, ContactFormSearch} from "contact/presentational";
import {EntityUpdatePanel} from "base/entity/components/presentational";
import {contact_view_adapter} from "contact/model";
import {ContractContactService} from "contract/service";

const UpdateContractContactPanel = ({area}) => {
    const {action, contactId} = useParams();

    const [contact, setContact] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const basePath = `/contracts/list/${contract.id}/${area}_staff`;

    const allowedPosts = [
        "residente_obra",
        "fiscal_obra",
        "supervisor_obra",
        "coordinador_social",
        "supervisor_social",
        "otro_contacto",
    ];

    useEffect(() => {
        if (action === "edit") {
            ContractContactService.get(contactId)
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
                ? ContractContactService.update(
                      contact_view_adapter({...contact, entity: contract.id})
                  )
                : ContractContactService.create(
                      contract.id,
                      contact_view_adapter({...contact})
                  );
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
        ContractContactService.create(contract.id, {...existingContact})
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

export default UpdateContractContactPanel;
