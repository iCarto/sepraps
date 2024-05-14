import {useState} from "react";

import {useNavigateWithReload} from "base/navigation/hooks";

import {MenuAction} from "base/ui/menu";
import {AlertError} from "base/error/components";
import {RemoveItemDialog} from "base/delete/components";

import LinkOffIcon from "@mui/icons-material/LinkOff";

export function useMenuGenericRemoveAction(service) {
    const navigate = useNavigateWithReload();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [element, setElement] = useState(false);
    const [error, setError] = useState("");

    const handleClickRemove = element => {
        setIsRemoveDialogOpen(true);
        setElement(element);
    };

    const handleRemove = () => {
        service(element)
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
            key="table-remove-action"
            id="table-remove-action"
            icon={<LinkOffIcon />}
            text="Quitar"
            handleClick={handleClickRemove}
        />
    );

    const dialog = (
        <>
            <AlertError error={error} />
            <RemoveItemDialog
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
                onRemove={handleRemove}
            />
        </>
    );

    return {action, dialog};
}
