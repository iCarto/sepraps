import {useState} from "react";

import {useNavigateWithReload} from "base/navigation/hooks";

import {MenuAction} from "base/ui/menu";
import {AlertError} from "base/error/components";
import {DeleteItemDialog} from "base/delete/components";

import DeleteIcon from "@mui/icons-material/Delete";

// TO-DO: Implement more generic delete action
export function useMenuGenericDeleteAction(service) {
    const navigate = useNavigateWithReload();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [error, setError] = useState("");

    const handleClickDelete = element => {
        setItemToDelete(element);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        service
            .delete(itemToDelete.id)
            .then(() => {
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const action = (
        <MenuAction
            key="table-delete-action"
            icon={<DeleteIcon color="error" />}
            text="Eliminar"
            handleClick={handleClickDelete}
        />
    );

    const dialog = (
        <>
            <AlertError error={error} />
            <DeleteItemDialog
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </>
    );

    return {action, dialog};
}
