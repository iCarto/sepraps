import {DialogLayout} from "base/shared/components";

const RemoveItemDialog = ({
    isDialogOpen,
    setIsDialogOpen,
    onRemove,
    createEntityObject = null,
    entity = {},
    subEntityName = "",
    subEntityList = [],
    itemToRemove = null,
}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
        if (subEntityName) {
            let itemToRemoveIndex = subEntityList.findIndex(
                item => parseInt(item.id) === parseInt(itemToRemove)
            );

            subEntityList.splice(itemToRemoveIndex, 1);

            const updatedEntity = createEntityObject({
                ...entity,
                [`${subEntityName}`]: [...subEntityList],
            });

            onRemove(updatedEntity);
        } else {
            onRemove();
        }

        setIsDialogOpen(false);
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
