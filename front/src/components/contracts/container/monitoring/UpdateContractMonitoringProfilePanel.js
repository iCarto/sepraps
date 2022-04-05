import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {ContractService} from "service/api";
import {contract_view_adapter, createContract} from "model";
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

    let postName = "";

    switch (sectionName) {
        case "field_manager":
            postName = "Residente de obra";
            break;
        case "construction_inspector":
            postName = "Fiscal constructivo";
            break;
        case "construction_supervisor":
            postName = "Supervisor constructivo";
            break;
        case "social_coordinator":
            postName = "Coordinador social";
            break;
        case "social_inspector":
            postName = "Fiscal social";
            break;
        case "social_supervisor":
            postName = "Supervisor social";
            break;
        default:
            break;
    }

    let post = postName.toLowerCase().replace(/ de /g, " ").replace(/ /g, "_");

    let showIsStaff =
        sectionName === "construction_inspector" || sectionName === "social_inspector"
            ? true
            : false;

    const handleCloseSidebar = () => {
        navigate(`/contracts/${contract.id}/monitoring`);
    };

    const handleSubmit = data => {
        let is_staff;
        if (sectionName === "field_manager" || sectionName === "social_coordinator") {
            is_staff = false;
        } else if (
            sectionName === "social_supervisor" ||
            sectionName === "construction_supervisor"
        ) {
            is_staff = true;
        } else is_staff = data.is_staff;

        const updatedContract = createContract({
            ...contract,
            contract: contract.id,
            [sectionName]: {
                id: data.id,
                name: data.name,
                post: post,
                post_name: postName,
                gender: data.gender,
                phone: data.phone,
                email: data.email,
                comments: data.comments,
                is_staff: is_staff,
            },
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
                    ? `Modificar ${postName.toLowerCase()}`
                    : `Asignar ${postName.toLowerCase()}`
            }
            closeSidebarClick={handleCloseSidebar}
        >
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            {action === "search" ? (
                <ContactFormSearch allowedPosts={[post]} onSelect={handleSubmit} />
            ) : (
                <ContactForm
                    contact={contract[sectionName]}
                    showPostField={true}
                    onSubmit={handleSubmit}
                    showIsStaff={showIsStaff}
                />
            )}
        </SidebarPanel>
    );
};

export default UpdateContractMonitoringProfilePanel;
