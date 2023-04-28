import {Fragment, useState} from "react";

import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractorService} from "contractor/service";

import {AccordionLayout} from "base/shared/components";
import {AddContactButtonGroup, ContactsTable} from "contact/presentational";
import {
    DeleteContractorContactDialog,
    RemoveContractorContactDialog,
} from "../container";
import {AlertError} from "base/error/components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const ContractorContactsSection = ({contractor, isSidePanelOpen = false}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [contactToRemove, setContactToRemove] = useState(null);
    const [error, setError] = useState("");

    // const tableContainerWidth = isSidePanelOpen
    //     ? {md: "350px", lg: "550px", xl: "100%"}
    //     : {md: "625px", lg: "100%", xl: "100%"};

    const tableContainerWidth = {md: "350px", lg: "550px", xl: "100%"};

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
        navigate(`contractor/contact/${contactId}/edit`);
    };

    const handleUpdateContractor = updatedContractor => {
        ContractorService.updateContractor(updatedContractor)
            .then(() => {
                navigate(`/contracts/${contractor.contract}/summary`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <Fragment>
            <AccordionLayout
                accordionTitle="Contactos"
                accordionIcon={<PermContactCalendarIcon />}
            >
                <Grid container spacing={2}>
                    <Grid item container xs={12} justifyContent="center">
                        {contractor.contacts.length ? (
                            <Box
                                sx={{
                                    overflowX: "auto",
                                    overflowY: "hidden",
                                    width: tableContainerWidth,
                                }}
                            >
                                <ContactsTable
                                    contacts={contractor.contacts}
                                    handleActions={handleActions}
                                />
                            </Box>
                        ) : (
                            <Typography pt={3} sx={{fontStyle: "italic"}}>
                                Este contratista aún no tiene contactos
                            </Typography>
                        )}
                    </Grid>
                    <AuthAction
                        roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                    >
                        <Grid item container xs={12} mt={3} justifyContent="center">
                            <AddContactButtonGroup
                                basePath="contractor/contact"
                                btnName="Añadir contacto"
                            />
                        </Grid>
                    </AuthAction>
                    <AlertError error={error} />
                </Grid>
            </AccordionLayout>
            <RemoveContractorContactDialog
                contractor={contractor}
                contactToRemove={contactToRemove}
                onRemoval={handleUpdateContractor}
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
            />
            <DeleteContractorContactDialog
                contractor={contractor}
                contactToDelete={contactToRemove}
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
            />
        </Fragment>
    );
};

export default ContractorContactsSection;
