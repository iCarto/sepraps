import {createProject} from "model";
import {DialogLayout} from "components/common/presentational";

const CloseProjectDialog = ({
    project,
    onClosure = null,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmClosure = () => {
        const updatedProject = createProject({
            ...project,
            closed: true,
        });

        onClosure(updatedProject);
    };

    return (
        <DialogLayout
            dialogLabel="Close project"
            dialogTitle="¿Quiere archivar este proyecto?"
            dialogContentText="Si hace clic en Archivar, el proyecto se cerrará y no aparecerá en los proyectos activos."
            mainActionClick={handleConfirmClosure}
            mainActionText="Archivar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default CloseProjectDialog;
