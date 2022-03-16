import {createContract} from "model";
import {DialogLayout} from "components/common/presentational";

const RemoveContractProjectDialog = ({
    contract = null,
    projectToRemove,
    onRemoval = null,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
        let projectToRemoveIndex = contract.projects.findIndex(
            project => project.id === projectToRemove
        );

        contract.projects.splice(projectToRemoveIndex, 1);

        const updatedContract = createContract({
            ...contract,
            projects: [...contract.projects],
        });

        onRemoval(updatedContract);
        setIsDialogOpen(false);
    };

    return (
        <DialogLayout
            dialogLabel="Remove project"
            dialogTitle="¿Quiere quitar este proyecto del contrato?"
            dialogContentText="Si hace clic en Quitar, el proyecto se borrará de la lista de proyectos de este contrato."
            mainActionClick={handleConfirmRemoval}
            mainActionText="Quitar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default RemoveContractProjectDialog;
