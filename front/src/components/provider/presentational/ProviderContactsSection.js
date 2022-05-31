import {Fragment, useState} from "react";
import {useNavigateWithReload} from "hooks";
import {AuthAction, useAuth} from "auth";
import {ProviderService} from "service/api";

import {AccordionLayout} from "components/common/presentational";
import {AddContactButtonGroup, ContactsTable} from "components/contacts/presentational";
import {DeleteProviderContactDialog, RemoveProviderContactDialog} from "../container";

import {AlertError} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const ProviderContactsSection = ({provider}) => {
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
        navigate(`provider/contact/${contactId}/edit`);
    };

    const handleUpdateProvider = updatedProvider => {
        ProviderService.updateProvider(updatedProvider)
            .then(() => {
                navigate(`/projects/${provider.project}/location`, true);
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
                        {provider.contacts.length !== 0 ? (
                            <ContactsTable
                                contacts={provider.contacts}
                                handleActions={handleActions}
                            />
                        ) : (
                            <Typography pt={3} sx={{fontStyle: "italic"}}>
                                Este prestador aún no tiene contactos
                            </Typography>
                        )}
                    </Grid>
                    <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT]}>
                        <Grid item container xs={12} mt={3} justifyContent="center">
                            <AddContactButtonGroup
                                basePath="provider/contact"
                                btnName="Añadir contacto"
                            />
                        </Grid>
                    </AuthAction>
                    <AlertError error={error} />
                </Grid>
            </AccordionLayout>
            <RemoveProviderContactDialog
                provider={provider}
                contactToRemove={contactToRemove}
                onRemoval={handleUpdateProvider}
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
            />
            <DeleteProviderContactDialog
                provider={provider}
                contactToDelete={contactToRemove}
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
            />
        </Fragment>
    );
};

export default ProviderContactsSection;
