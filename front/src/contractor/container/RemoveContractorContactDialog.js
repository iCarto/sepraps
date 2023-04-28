import {createContractor} from "contractor/model";
import {DialogLayout} from "base/shared/components";

const RemoveContractorContactDialog = ({
    contractor = null,
    contactToRemove,
    onRemoval = null,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
        let contactToRemoveIndex = contractor.contacts.findIndex(
            contact => contact.id === contactToRemove
        );

        contractor.contacts.splice(contactToRemoveIndex, 1);

        const updatedContractor = createContractor({
            ...contractor,
            contacts: [...contractor.contacts],
        });

        onRemoval(updatedContractor);
        setIsDialogOpen(false);
    };

    return (
        <DialogLayout
            dialogLabel="Remove contact"
            dialogTitle="¿Quiere quitar este contacto de la lista?"
            dialogContentText="Si hace clic en Quitar, el contacto se borrará de la lista de contactos del contratista."
            mainActionClick={handleConfirmRemoval}
            mainActionText="Quitar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default RemoveContractorContactDialog;
