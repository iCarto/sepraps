import {useState} from "react";
import {useNavigateWithReload} from "hooks";
import {ContactService, ProviderService} from "service/api";
import createProvider from "model/Provider";

import {
    AccordionLayout,
    DialogLayout,
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import {ContactsTable} from "components/contacts/presentational";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOn from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Alert from "@mui/material/Alert";

const ProviderSection = ({provider, hideButtons = null}) => {
    const navigate = useNavigateWithReload();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [contactToRemove, setContactToRemove] = useState(null);
    const [actionToPerform, setActionToPerform] = useState("");
    const [error, setError] = useState("");

    const headerActions = provider.id
        ? [
              <SectionCardHeaderAction
                  key="edit"
                  name="edit"
                  title="Modificar"
                  icon={<EditIcon />}
                  onClick={() => {
                      navigate("provider/edit");
                  }}
              />,
          ]
        : [
              <SectionCardHeaderAction
                  key="add"
                  name="add"
                  title="Añadir"
                  icon={<AddCircleOutlineIcon />}
                  onClick={() => {
                      navigate("provider/add");
                  }}
              />,
          ];

    const handleAction = (contactId, action) => {
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

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);
        ContactService.deleteContact(contactToRemove).then(() => {
            navigate(`/projects/${provider.project}`, true);
        });
    };

    const handleUpdateProvider = updatedProvider => {
        ProviderService.updateProvider(updatedProvider)
            .then(() => {
                navigate(`/projects/${provider.project}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    return (
        <SectionCard
            title="Prestador"
            headerActions={!hideButtons ? headerActions : null}
        >
            {provider.id ? (
                <>
                    <SectionField label="Nombre:" value={provider.name} />
                    <SectionField
                        label="Ubicación:"
                        value={`${provider.locality.locality_name}, ${provider.locality.department_name} (${provider.locality.district_name})`}
                        labelIcon={LocationOn}
                    />
                </>
            ) : (
                <Typography style={{fontStyle: "italic"}}>
                    No se ha asignado prestador al proyecto todavía
                </Typography>
            )}
            <AccordionLayout
                accordionTitle="Contactos"
                accordionDetails={
                    <Box sx={{width: "100%"}}>
                        <ContactsTable
                            contacts={provider.contacts}
                            handleAction={handleAction}
                        />
                        <Button
                            variant="contained"
                            sx={{display: "block", mr: 0, ml: "auto", mt: 2}}
                            name="add-contact"
                            onClick={() => {
                                navigate("provider/contact/new/add");
                            }}
                        >
                            Nuevo contacto
                        </Button>
                        {error && (
                            <Alert severity="error" sx={{mt: 2, mb: 2}}>
                                {error}
                            </Alert>
                        )}
                    </Box>
                }
            />
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
        </SectionCard>
    );
};

export default ProviderSection;
