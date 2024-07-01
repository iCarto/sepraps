import {DialogLayout} from "base/dialog/components";

const DuplicateTrainingDialog = ({
    isDialogOpen,
    setIsDialogOpen,
    onDelete,
    trainingName,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(false);
    };

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);
        onDelete();
    };

    return (
        <DialogLayout
            dialogTitle={`¿Desea duplicar la capacitación "${trainingName}"?`}
            onMainActionClick={handleConfirmDeletion}
            mainActionText="Duplicar"
            onHandleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default DuplicateTrainingDialog;
