import {ContactService} from "contact/service";
import {useNavigateWithReload} from "base/navigation/hooks";

import {DialogLayout} from "base/dialog/components";

const DeleteContractContactDialog = ({
    contract = null,
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
            navigate(`/contracts/list/${contract.id}/monitoring`, true);
        });
    };

    return (
        <DialogLayout
            dialogLabel="Delete contact"
            dialogTitle="¿Quiere eliminar este contacto definitivamente?"
            dialogContentText="Este contacto no se podrá recuperar."
            onMainActionClick={handleConfirmDeletion}
            mainActionText="Eliminar"
            mainActionColor="error"
            onHandleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default DeleteContractContactDialog;
