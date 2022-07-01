import {createContract} from "model";
import {DialogLayout} from "components/common/presentational";

const RemoveContractContactDialog = ({
    contract = null,
    contactToRemove,
    onRemoval = null,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
        let contactToRemoveIndex = contract.contacts.findIndex(
            contact => contact.id === contactToRemove
        );

        contract.contacts.splice(contactToRemoveIndex, 1);

        const updatedContractor = createContract({
            ...contract,
            contacts: [...contract.contacts],
        });

        onRemoval(updatedContractor);
        setIsDialogOpen(false);
    };

    return (
        <DialogLayout
            dialogLabel="Remove contact"
            dialogTitle="¿Quiere quitar este contacto de la lista?"
            dialogContentText="Si hace clic en Quitar, el contacto se borrará de la lista de contactos del contrato."
            mainActionClick={handleConfirmRemoval}
            mainActionText="Quitar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default RemoveContractContactDialog;
