import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {ContractService} from "service/api";
import {contract_view_adapter, createContact, createContract} from "model";
import {useNavigateWithReload} from "hooks";

import {ContactForm, ContactFormSearch} from "components/contacts/presentational";
import {SidebarPanel} from "layout";
import Alert from "@mui/material/Alert";

const UpdateContractMonitoringProfilePanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    const {sectionName, action} = useParams();

    let contract;
    [contract] = useOutletContext();

    const allowedPosts = [sectionName];

    let sectionNameForTitle = "";

    switch (sectionName) {
        case "field_manager":
            sectionNameForTitle = "Residente de obra";
            break;
        case "construction_inspector":
            sectionNameForTitle = "Fiscal constructivo";
            break;
        case "construction_supervisor":
            sectionNameForTitle = "supervisor_constructivo";
            break;
        case "social_coordinator":
            sectionNameForTitle = "Coordinador social";
            break;
        case "social_inspector":
            sectionNameForTitle = "Fiscal social";
            break;
        case "social_supervisor":
            sectionNameForTitle = "Supervisor social";
            break;
        default:
            break;
    }

    console.log({sectionName});

    /// NECESITAMOS EL NOMBRE DE LA PROPIEDAD (QUE ESTÁ EN INGLÉS) PARA EL PATH - EL POST PARA EL CONTACT FORM Y EL CONTACT FORM SEARCH Y PARA EL DEFAULT - EL POST_NAME PARA EL TÍTULO DE LA SECCIÓN Y PARA EL DEFAULT POST_NAME

    let showIsStaff =
        sectionName === "construction_inspector" ||
        sectionName === "construction_supervisor" ||
        sectionName === "social_inspector" ||
        sectionName === "social_supervisor"
            ? true
            : false;

    const handleCloseSidebar = () => {
        navigate(`/contracts/${contract.id}/monitoring`);
    };

    const handleSubmit = data => {
        console.log({data});
        const updatedContract = createContract({
            ...contract,
            contract: contract.id,
            [sectionName]: {
                id: data.contact_id,
                name: data.contact_name,
                post: sectionName,
                post_name: sectionNameForTitle,
                gender: data.contact_gender,
                phone: data.contact_phone,
                email: data.contact_email,
                comments: data.contact_comments,
                is_staff:
                    sectionName === "field_manager" ||
                    sectionName === "social_coordinator"
                        ? true
                        : data.contact_is_staff,
            },
        });
        handleFormSubmit(updatedContract);
    };

    // ------------> TO-DO: UPDATE THIS
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
                    is_staff: contact.is_staff,
                },
            ],
        });
        handleFormSubmit(updatedContract);
    };

    const handleFormSubmit = updatedContract => {
        ContractService.updateContract(
            contract_view_adapter({...updatedContract, updatedContract})
        )
            .then(() => {
                navigate(`/contracts/${contract.id}/monitoring`, true);
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
                    allowedPosts={[contract?.post]}
                    onSelect={handleSelectExistingContact}
                />
            ) : (
                <ContactForm
                    contact={contract[sectionName]}
                    isMonitoringProfile={true}
                    onSubmit={handleSubmit}
                    showIsStaff={showIsStaff}
                />
            )}
        </SidebarPanel>
    );
};

export default UpdateContractMonitoringProfilePanel;
