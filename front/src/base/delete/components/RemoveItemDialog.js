import {DialogLayout} from "base/shared/components";

const RemoveItemDialog = ({isDialogOpen, setIsDialogOpen, onRemove}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
        setIsDialogOpen(false);
        onRemove();
    };

    return (
        <DialogLayout
            dialogTitle={`¿Quiere quitar este elemento de la lista?`}
            dialogContentText={`El elemento se borrará se eliminará de esta lista.`}
            mainActionText="Quitar"
            mainActionClick={handleConfirmRemoval}
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
            mainActionColor="warning"
        />
    );
};

export default RemoveItemDialog;
