import {Fragment, useState} from "react";
import {useNavigateWithReload} from "hooks";
import {ContactService, ProviderService} from "service/api";
import {createProvider} from "model";

import {AccordionLayout, DialogLayout} from "components/common/presentational";
import {AddContactButtonGroup, ContactsTable} from "components/contacts/presentational";

import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const ProviderContactsSection = ({provider}) => {
    const navigate = useNavigateWithReload();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [contactToRemove, setContactToRemove] = useState(null);
    const [actionToPerform, setActionToPerform] = useState("");
    const [error, setError] = useState("");

    const handleActions = (contactId, action) => {
        setActionToPerform(action);
        switch (action) {
            case "remove":
                setContactToRemove(contactId);
                setIsDialogOpen(true);
                break;
            case "delete":
                setContactToRemove(contactId);
                setIsDialogOpen(true);
                break;
            case "edit":
                handleEdit(contactId);
                break;
            default:
                break;
        }
    };

    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleEdit = contactId => {
        navigate(`provider/contact/${contactId}/edit`);
    };

    const handleConfirmRemoval = () => {
        let contactToRemoveIndex = provider.contacts.findIndex(
            contact => contact.id === contactToRemove
        );

        provider.contacts.splice(contactToRemoveIndex, 1);

        const updatedProvider = createProvider({
            id: provider.id,
            name: provider.name,
            area: provider.area,
            locality: provider.locality.code,
            project: provider.project,
            contacts: provider.contacts,
        });

        handleUpdateProvider(updatedProvider);
        setIsDialogOpen(false);
    };

    const handleUpdateProvider = updatedProvider => {
        ProviderService.updateProvider(updatedProvider)
            .then(() => {
                navigate(`/projects/${provider.project}/location`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);
        ContactService.deleteContact(contactToRemove).then(() => {
            navigate(`/projects/${provider.project}/location`, true);
        });
    };

    return (
        <Fragment>
            <AccordionLayout
                accordionTitle="Contactos"
                accordionIcon={<PermContactCalendarIcon />}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ContactsTable
                            contacts={provider.contacts}
                            handleActions={handleActions}
                        />
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                        <AddContactButtonGroup basePath="provider/contact" />
                    </Grid>
                    <Grid item xs={12}>
                        {error && (
                            <Alert severity="error" sx={{mt: 2, mb: 2}}>
                                {error}
                            </Alert>
                        )}
                    </Grid>
                </Grid>
            </AccordionLayout>
            {actionToPerform === "remove" && (
                <DialogLayout
                    dialogLabel="Remove contact"
                    dialogTitle="¿Quiere quitar este contacto de la lista?"
                    dialogContentText="Si hace clic en Quitar, el contacto se borrará de la lista de contactos del proveedor."
                    mainActionClick={handleConfirmRemoval}
                    mainActionText="Quitar"
                    handleDialog={handleDialog}
                    isDialogOpen={isDialogOpen}
                />
            )}
            {actionToPerform === "delete" && (
                <DialogLayout
                    dialogLabel="Delete contact"
                    dialogTitle="¿Quiere eliminar este contacto definitivamente?"
                    dialogContentText="Si hace clic en Eliminar, el contacto se borrará definitivamente. Este contacto no se podrá recuperar."
                    mainActionClick={handleConfirmDeletion}
                    mainActionText="Eliminar"
                    handleDialog={handleDialog}
                    isDialogOpen={isDialogOpen}
                />
            )}
        </Fragment>
    );
};

export default ProviderContactsSection;
