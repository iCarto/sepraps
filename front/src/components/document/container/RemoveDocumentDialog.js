import {DialogLayout} from "components/common/presentational";
import {DocumentService} from "service/api";

const RemoveDocumentDialog = ({
    folderElement,
    onDeletedFolderElement = null,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
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
            mainActionClick={handleConfirmRemoval}
            mainActionText="Eliminar"
            mainActionColor="error"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default RemoveDocumentDialog;
