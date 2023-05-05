import {DialogLayout} from "base/shared/components";

const DeleteItemDialog = ({isDialogOpen, setIsDialogOpen, onDelete}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);
        onDelete();
    };

    return (
        <DialogLayout
            dialogTitle={`¿Quiere eliminar este elemento definitivamente?`}
            dialogContentText={`Si hace clic en Eliminar, el elemento se borrará y no se podrá recuperar.`}
            mainActionClick={handleConfirmDeletion}
            mainActionText="Eliminar"
            mainActionColor="error"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default DeleteItemDialog;
