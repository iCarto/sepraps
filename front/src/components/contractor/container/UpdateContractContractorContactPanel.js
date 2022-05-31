import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractorService} from "service/api";
import {createContractor} from "model";
import {AlertError} from "components/common/presentational";

import {SidebarPanel} from "layout";
import {ContactForm, ContactFormSearch} from "components/contacts/presentational";

const UpdateContractContractorContactPanel = () => {
    const {action, contactId} = useParams();

    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleSubmit = data => {
        const updatedContractor = createContractor({
            ...contract.contractor,
            contacts: [
                ...contract.contractor.contacts,
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

export default UpdateContractContractorContactPanel;
