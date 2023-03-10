import {DialogLayout} from "components/common/presentational";

const CloseProjectDialog = ({onClosure = null, isDialogOpen, setIsDialogOpen}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleClosure = () => {
        onClosure();
    };
    return (
        <DialogLayout
            dialogLabel="Close project"
            dialogTitle="¿Quiere archivar este proyecto?"
            dialogContentText="Si hace clic en Archivar, el proyecto se cerrará y no aparecerá en los proyectos activos."
            mainActionClick={handleClosure}
            mainActionText="Archivar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default CloseProjectDialog;
