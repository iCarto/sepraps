import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractorService} from "contractor/service";
import {createContractor} from "contractor/model";
import {AlertError} from "base/error/components";

import {SidebarPanel} from "base/ui/sidebar";
import {ContactForm, ContactFormSearch} from "contact/presentational";

const UpdateContractContractorContactPanel = () => {
    const {action, contactId} = useParams();

    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

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
                    post_name: data.post_name,
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
        ContractorService.updateContractor(contractor)
            .then(() => {
                navigate(`/contracts/${contract.id}/summary`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleCloseSidebar = () => {
        navigate(`/contracts/${contract.id}/summary`);
    };

    const selectedContact =
        action === "edit"
            ? contract.contractor.contacts.find(
                  contact => contact.id === parseInt(contactId)
              )
            : null;

    const allowedPosts = ["responsable_contratista", "residente_obra"];

    return (
        <SidebarPanel
            sidebarTitle="Añadir contacto"
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

export default UpdateContractContractorContactPanel;
