import {DialogLayout} from "base/dialog/components";

const DeleteItemDialog = ({isDialogOpen, setIsDialogOpen, onDelete}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(false);
    };

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);
        onDelete();
    };

    return (
        <DialogLayout
            dialogTitle={`¿Quiere eliminar este elemento definitivamente?`}
            dialogContentText={`Si hace clic en Eliminar, el elemento se borrará y no se podrá recuperar.`}
            onMainActionClick={handleConfirmDeletion}
            mainActionText="Eliminar"
            mainActionColor="error"
            onHandleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default DeleteItemDialog;
