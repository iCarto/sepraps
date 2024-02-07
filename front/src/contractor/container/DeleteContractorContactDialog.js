import {ContactService} from "contact/service";
import {useNavigateWithReload} from "base/navigation/hooks";

import {DialogLayout} from "base/dialog/components";

const DeleteContractorContactDialog = ({
    contractor = null,
    contactToDelete,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const navigate = useNavigateWithReload();

    const handleDialog = isOpen => {
        setIsDialogOpen(false);
    };

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);
        ContactService.delete(contactToDelete).then(() => {
            navigate(`/contracts/list/${contractor.contract}`, true);
        });
    };

    return (
        <DialogLayout
            dialogLabel="Delete contact"
            dialogTitle="¿Quiere eliminar este contacto definitivamente?"
            dialogContentText="Si hace clic en Eliminar, el contacto se borrará definitivamente. Este contacto no se podrá recuperar."
            onMainActionClick={handleConfirmDeletion}
            mainActionText="Eliminar"
            mainActionColor="error"
            onHandleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default DeleteContractorContactDialog;
