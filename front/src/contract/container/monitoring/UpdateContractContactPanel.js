import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {ContractService} from "contract/service";
import {contract_view_adapter, createContract} from "contract/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ContactForm, ContactFormSearch} from "contact/presentational";
import {SidebarPanel} from "base/ui/sidebar";
import {AlertError} from "base/error/components";

const UpdateContractContactPanel = () => {
    const {action, contactId} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleCloseSidebar = () => {
        navigate(`/contracts/${contract.id}/monitoring`);
    };

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
        ContractService.updateContract(contract_view_adapter({...updatedContract}))
            .then(() => {
                navigate(`/contracts/${contract.id}/monitoring`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

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

    return (
        <SidebarPanel
            sidebarTitle={action === "edit" ? `Modificar contacto` : `Asignar contacto`}
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

export default UpdateContractContactPanel;
