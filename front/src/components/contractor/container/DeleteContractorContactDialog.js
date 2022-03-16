import {ContactService} from "service/api";
import {useNavigateWithReload} from "hooks";

import {DialogLayout} from "components/common/presentational";

const DeleteContractorContactDialog = ({
    contractor = null,
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
        ContactService.deleteContact(contactToDelete).then(() => {
            navigate(`/contracts/${contractor.contract}`, true);
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

export default DeleteContractorContactDialog;
