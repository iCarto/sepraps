import {Fragment, useState} from "react";
import {useNavigateWithReload} from "hooks";
import {AuthAction, useAuth} from "auth";
import {ContractService} from "service/api";

import {AddContactButtonGroup, ContactsTable} from "components/contacts/presentational";
import {
    DeleteContractContactDialog,
    RemoveContractContactDialog,
} from "../container/monitoring";

import Grid from "@mui/material/Grid";
import {AlertError} from "components/common/presentational";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {contract_view_adapter} from "model";

const ContractContactsSection = ({contract, isSidePanelOpen = false}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [contactToRemove, setContactToRemove] = useState(null);
    const [error, setError] = useState("");

    const tableContainerWidth = isSidePanelOpen
        ? {md: "350px", lg: "550px", xl: "100%"}
        : {md: "625px", lg: "100%", xl: "100%"};

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
        <Fragment>
            <Grid container spacing={2}>
                <Grid item container xs={12} justifyContent="center">
                    {contract.contacts.length !== 0 ? (
                        <Box
                            sx={{
                                overflowX: "auto",
                                overflowY: "hidden",
                                width: tableContainerWidth,
                            }}
                        >
                            <ContactsTable
                                contacts={contract.contacts}
                                handleActions={handleActions}
                            />
                        </Box>
                    ) : (
                        <Typography pt={3} sx={{fontStyle: "italic"}}>
                            Este contrato aún no tiene contactos de supervisión
                        </Typography>
                    )}
                </Grid>
                <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT]}>
                    <Grid item container xs={12} mt={3} justifyContent="center">
                        <AddContactButtonGroup
                            basePath="contact"
                            btnName="Añadir contacto"
                        />
                    </Grid>
                </AuthAction>
                <AlertError error={error} />
            </Grid>
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
        </Fragment>
    );
};

export default ContractContactsSection;
