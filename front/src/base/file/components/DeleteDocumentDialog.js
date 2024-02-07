import {DialogLayout} from "base/dialog/components";
import {DocumentService} from "../service";

const DeleteDocumentDialog = ({
    folderElement,
    onDeletedFolderElement = null,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(false);
    };

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);

        DocumentService.delete(folderElement.path).then(() => {
            if (onDeletedFolderElement) {
                onDeletedFolderElement();
            }
        });
    };

    return (
        <DialogLayout
            dialogLabel="Delete document"
            dialogTitle="¿Quiere eliminar este archivo?"
            dialogContentText="Si hace clic en Eliminar, el archivo se eliminará y no se podrá recuperar."
            onMainActionClick={handleConfirmDeletion}
            mainActionText="Eliminar"
            mainActionColor="error"
            onHandleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default DeleteDocumentDialog;
