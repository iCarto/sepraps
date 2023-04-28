import {createProject} from "project/model";
import {DialogLayout} from "base/shared/components";

const RemoveProjectLinkedLocalityDialog = ({
    project = null,
    localityToRemove,
    onRemoval = null,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
        let localityToRemoveIndex = project.linked_localities.findIndex(
            locality => locality.code === localityToRemove
        );

        project.linked_localities.splice(localityToRemoveIndex, 1);

        const updatedProject = createProject({
            ...project,
            linked_localities: [...project.linked_localities],
        });

        onRemoval(updatedProject);
        setIsDialogOpen(false);
    };

    return (
        <DialogLayout
            dialogLabel="Remove linked locality"
            dialogTitle="¿Quiere desvincular esta localidad del proyecto?"
            dialogContentText="Si hace clic en Quitar, el contacto se borrará de la lista de localidades vinculadas al proyecto."
            mainActionClick={handleConfirmRemoval}
            mainActionText="Quitar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default RemoveProjectLinkedLocalityDialog;
