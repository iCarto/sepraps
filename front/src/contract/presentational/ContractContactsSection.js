import {useState} from "react";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useAuth} from "base/user/provider";
import {ContractService} from "contract/service";

import {ContactsTable} from "contact/presentational";
import {
    DeleteContractContactDialog,
    RemoveContractContactDialog,
} from "../container/monitoring";

import {AlertError} from "base/error/components";
import {contract_view_adapter} from "contract/model";
import {SectionCard} from "base/section/components";
import Typography from "@mui/material/Typography";

const ContractContactsSection = ({contract}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [contactToRemove, setContactToRemove] = useState(null);
    const [error, setError] = useState("");

    const handleActions = (contactId, action) => {
        switch (action) {
            case "remove":
                setContactToRemove(contactId);
                setIsRemoveDialogOpen(true);
                break;
            case "delete":
                setContactToRemove(contactId);
                setIsDeleteDialogOpen(true);
                break;
            case "edit":
                handleEdit(contactId);
                break;
            default:
                break;
        }
    };

    const handleEdit = contactId => {
        navigate(`contact/${contactId}/edit`);
    };

    const handleUpdateContractor = updatedContract => {
        ContractService.updateContract(contract_view_adapter({...updatedContract}))
            .then(() => {
                navigate(`/contracts/${contract.id}/monitoring`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <>
            <SectionCard title="Contactos de supervisión">
                <AlertError error={error} />
                {contract.contacts.length ? (
                    <ContactsTable
                        contacts={contract.contacts}
                        handleActions={handleActions}
                    />
                ) : (
                    <Typography py={3} sx={{fontStyle: "italic", textAlign: "center"}}>
                        Este contrato no tiene contactos de supervisión
                    </Typography>
                )}
            </SectionCard>
            <RemoveContractContactDialog
                contract={contract}
                contactToRemove={contactToRemove}
                onRemoval={handleUpdateContractor}
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
            />
            <DeleteContractContactDialog
                contract={contract}
                contactToDelete={contactToRemove}
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
            />
        </>
    );
};

export default ContractContactsSection;