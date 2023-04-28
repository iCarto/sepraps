import {DialogLayout} from "../../shared/components";
import {DocumentService} from "../service";

const DeleteDocumentDialog = ({
    folderElement,
    onDeletedFolderElement = null,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
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
            mainActionClick={handleConfirmDeletion}
            mainActionText="Eliminar"
            mainActionColor="error"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default DeleteDocumentDialog;
