import {createProvider} from "model";
import {DialogLayout} from "components/common/presentational";

const RemoveProviderContactDialog = ({
    provider = null,
    contactToRemove,
    onRemoval = null,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
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

        onRemoval(updatedProvider);
        setIsDialogOpen(false);
    };

    return (
        <DialogLayout
            dialogLabel="Remove contact"
            dialogTitle="¿Quiere quitar este contacto de la lista?"
            dialogContentText="Si hace clic en Quitar, el contacto se borrará de la lista de contactos del prestador."
            mainActionClick={handleConfirmRemoval}
            mainActionText="Quitar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default RemoveProviderContactDialog;
