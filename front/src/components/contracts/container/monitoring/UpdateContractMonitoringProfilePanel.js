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
    }

    let post = postName.toLowerCase().replace(/ de /g, " ").replace(/ /g, "_");

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
                is_staff:
                    sectionName === "field_manager" ||
                    sectionName === "social_coordinator"
                        ? true
                        : data.is_staff,
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
                action === "edit" ? `Modificar ${postName}` : `Asignar ${postName}`
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
                    isMonitoringProfile={true}
                    onSubmit={handleSubmit}
                    showIsStaff={showIsStaff}
                />
            )}
        </SidebarPanel>
    );
};

export default UpdateContractMonitoringProfilePanel;
