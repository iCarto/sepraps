import {useState} from "react";

import {useNavigateWithReload} from "base/navigation/hooks";

import {MenuAction} from "base/ui/menu";
import {AlertError} from "base/error/components";
import {DeleteItemDialog} from "base/delete/components";

import DeleteIcon from "@mui/icons-material/Delete";
import {useLocation} from "react-router-dom";

// TO-DO: This is now more generic than menu action --Change name
export function useMenuGenericDeleteAction(service) {
    const navigate = useNavigateWithReload();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [error, setError] = useState("");
    const location = useLocation();

    const handleClickDelete = element => {
        setItemToDelete(element);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        service(itemToDelete)
            .then(() => {
                navigate(location.pathname, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const action = (
        <MenuAction
            key="table-delete-action"
            id="table-delete-action"
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

    return {action, dialog, handleClickDelete};
}
