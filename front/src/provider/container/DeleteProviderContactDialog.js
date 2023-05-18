import {ContactService} from "contact/service";

import {DialogLayout} from "base/shared/components";
import {useNavigateWithReload} from "base/navigation/hooks";

const DeleteProviderContactDialog = ({
    provider = null,
    contactToDelete,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const navigate = useNavigateWithReload();

    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);
        ContactService.delete(contactToDelete).then(() => {
            navigate(`/projects/${provider.project}/location`, true);
        });
    };

    return (
        <DialogLayout
            dialogLabel="Delete contact"
            dialogTitle="¿Quiere eliminar este contacto definitivamente?"
            dialogContentText="Si hace clic en Eliminar, el contacto se borrará definitivamente. Este contacto no se podrá recuperar."
            mainActionClick={handleConfirmDeletion}
            mainActionText="Eliminar"
            mainActionColor="error"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default DeleteProviderContactDialog;
