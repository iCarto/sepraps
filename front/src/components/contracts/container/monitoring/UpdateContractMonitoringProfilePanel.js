import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {ContractService} from "service/api";
import {createContract} from "model";
import {useNavigateWithReload} from "hooks";

import {ContractMonitoringContactForm} from "components/contracts/presentational/monitoring";
import {ContactFormSearch} from "components/contacts/presentational";
import {SidebarPanel} from "layout";
import Alert from "@mui/material/Alert";

const UpdateContractMonitoringProfilePanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    const {sectionName, action} = useParams();

    let contract;
    [contract] = useOutletContext();

    const fakeContractContacts = [
        // TO-DO: FOR TESTING PURPOSES ONLY - REMOVE WHEN API & ENDPOINTS ARE READY
        {
            id: 1,
            role: "Residente de obra",
            name: "María Rodríguez Rodríguez",
            gender: "F",
            phone: "+11 123 456 789",
            email: "maría@rodriguez.com",
            staff: false,
            comments: "Tiene una observación",
        },
        {
            id: 2,
            role: "Fiscal constructivo",
            name: "Clara Pérez Pérez",
            gender: "F",
            phone: "+11 123 456 789",
            email: "clara@perez.com",
            staff: true,
            comments: "",
        },
    ];

    // TO-DO: UPDATE WHEN API & ENDPOINTS ARE READY
    const selectedContact =
        action === "edit"
            ? fakeContractContacts.find(
                  contact =>
                      contact.role
                          .toLowerCase()
                          .replace(/ de /g, " ")
                          .replace(/ /g, "_") === sectionName
              )
            : null;

    const allowedPosts = [{sectionName}];

    const sectionNameForTitle = sectionName.split("_").join(" ");

    const handleCloseSidebar = () => {
        navigate(`/contracts/${contract.id}/monitoring`);
    };

    const handleSubmit = data => {
        console.log(data);
        // const updatedContract = createContract({
        //     ...contract,
        //     contract: contract.id,
        //     contacts: [
        //         ...contract.contacts,
        //         {
        //             id: data.contact_id,
        //             name: data.contact_name,
        //             post: data.sectionName,
        //             // post_name: data.contact_post_name,
        //             gender: data.contact_gender,
        //             phone: data.contact_phone,
        //             email: data.contact_email,
        //             comments: data.contact_comments,
        //             staff: data.contact.isStaff
        //         },
        //     ],
        // });
        // handleFormSubmit(updatedContract);
    };

    const handleSelectExistingContact = contact => {
        const updatedContract = createContract({
            ...contract,
            contacts: [
                ...contract.contacts,
                {
                    id: contact.id,
                    name: contact.name,
                    post: contact.post,
                    gender: contact.gender,
                    phone: contact.phone,
                    email: contact.email,
                    comments: contact.comments,
                    staff: contact.isStaff,
                },
            ],
        });
        handleFormSubmit(updatedContract);
    };

    const handleFormSubmit = contract => {
        ContractService.updateContract(contract)
            .then(() => {
                navigate(`/contracts/${contract.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    return (
        <SidebarPanel
            sidebarTitle={
                action === "edit"
                    ? `Modificar ${sectionNameForTitle}`
                    : `Asignar ${sectionNameForTitle}`
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
                    onSelect={handleSelectExistingContact}
                />
            ) : (
                <ContractMonitoringContactForm
                    contact={selectedContact}
                    onSubmit={handleSubmit}
                />
            )}
        </SidebarPanel>
    );
};

export default UpdateContractMonitoringProfilePanel;
