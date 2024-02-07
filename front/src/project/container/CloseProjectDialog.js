import {DialogLayout} from "base/dialog/components";

const CloseProjectDialog = ({onClosure = null, isDialogOpen, setIsDialogOpen}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(false);
    };

    const handleClosure = () => {
        onClosure();
    };
    return (
        <DialogLayout
            dialogLabel="Close project"
            dialogTitle="¿Quiere archivar este proyecto?"
            dialogContentText="Si hace clic en Archivar, el proyecto se cerrará y no aparecerá en los proyectos activos."
            onMainActionClick={handleClosure}
            mainActionText="Archivar"
            onHandleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default CloseProjectDialog;
