import {useState} from "react";

import {useNavigateWithReload} from "hooks";
import {ContactService, ContractorService} from "service/api";
import {createContractor} from "model";

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
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ContractorSection = ({contractor, hideButtons = null}) => {
    const navigate = useNavigateWithReload();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [contactToRemove, setContactToRemove] = useState(null);
    const [actionToPerform, setActionToPerform] = useState("");
    const [error, setError] = useState("");

    const headerActions = contractor.id
        ? [
              <SectionCardHeaderAction
                  key="edit"
                  name="edit"
                  title="Modificar"
                  icon={<EditIcon />}
                  onClick={() => {
                      navigate("contractor/edit");
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
                      navigate("contractor/add");
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

    const handleEdit = contactId => {
        navigate(`contractor/contact/${contactId}/edit`);
    };

    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
        let contactToRemoveIndex = contractor.contacts.findIndex(
            contact => contact.id === contactToRemove
        );

        contractor.contacts.splice(contactToRemoveIndex, 1);

        const updatedContractor = createContractor({
            id: contractor.id,
            name: contractor.name,
            contractor_type: contractor.contractor_type,
            contractor_type_name: contractor.contractor_type_name,
            phone: contractor.phone,
            email: contractor.email,
            contract: contractor.contract,
            contacts: contractor.contacts,
        });

        handleUpdateContractor(updatedContractor);
        setIsDialogOpen(false);
    };

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);
        ContactService.deleteContact(contactToRemove).then(() => {
            navigate(`/contracts/${contractor.contract}`, true);
        });
    };

    const handleUpdateContractor = updatedContractor => {
        ContractorService.updateContractor(updatedContractor)
            .then(() => {
                navigate(`/contracts/${contractor.contract}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    return (
        <SectionCard
            title="Contratista"
            headerActions={!hideButtons ? headerActions : null}
        >
            {contractor.id ? (
                <>
                    <SectionField label="Nombre:" value={contractor.name} />
                    <SectionField
                        label="Tipo:"
                        value={contractor.contractor_type_name}
                    />
                    <SectionField label="Teléfono:" value={contractor.phone} />
                    <SectionField
                        label="Correo electrónico:"
                        value={contractor.email}
                    />
                </>
            ) : (
                <Typography style={{fontStyle: "italic"}}>
                    No se ha asignado contratista al contrato todavía
                </Typography>
            )}
            <AccordionLayout
                accordionTitle="Contactos"
                accordionDetails={
                    <Box sx={{width: "100%"}}>
                        <ContactsTable
                            contacts={contractor.contacts}
                            handleAction={handleAction}
                        />
                        <Button
                            variant="contained"
                            sx={{display: "block", mr: 0, ml: "auto", mt: 2}}
                            name="add-contact"
                            onClick={() => {
                                navigate("contractor/contact/new/add");
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
                    dialogContentText="Si hace clic en Quitar, el contacto se borrará de la lista de contactos del contratista."
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

export default ContractorSection;
