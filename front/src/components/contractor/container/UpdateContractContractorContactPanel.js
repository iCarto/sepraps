import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractorService} from "service/api";
import {createContractor} from "model";

import {SidebarPanel} from "layout";
import {ContactForm, ContactFormSearch} from "components/contacts/presentational";
import Alert from "@mui/material/Alert";

const UpdateContractContractorContactPanel = () => {
    const {action, contactId} = useParams();

    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSubmit = data => {
        const updatedContractor = createContractor({
            ...contract.contractor,
            contract: contract.id,
            contacts: [
                ...contract.contractor.contacts,
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
        });
        handleFormSubmit(updatedContractor);
    };

    const handleSelectExistingContact = contact => {
        const updatedContractor = createContractor({
            ...contract.contractor,
            contacts: [
                ...contract.contractor.contacts,
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
        });
        handleFormSubmit(updatedContractor);
    };

    const handleFormSubmit = contractor => {
        ContractorService.updateContractor(contractor)
            .then(() => {
                navigate(`/contracts/${contract.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCancel = () => {
        navigate(`/contracts/${contract.id}`);
    };

    const selectedContact =
        action === "edit"
            ? contract.contractor.contacts.find(
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

export default UpdateContractContractorContactPanel;
