import {useState} from "react";

import {useNavigateWithReload} from "base/navigation/hooks";

import {MenuAction} from "base/ui/menu";
import {AlertError} from "base/error/components";
import {RemoveItemDialog} from "base/delete/components";

import LinkOffIcon from "@mui/icons-material/LinkOff";

export function useMenuGenericRemoveAction(
    entity,
    entityAttribute,
    service,
    createEntityObject
) {
    const navigate = useNavigateWithReload();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [error, setError] = useState("");

    const subEntityList = entity[entityAttribute];

    const handleClickRemove = element => {
        setIsRemoveDialogOpen(true);
        if (entityAttribute) {
            setItemToRemove(
                subEntityList.findIndex(
                    item => parseInt(item.id) === parseInt(element.id)
                )
            );
        }
    };

    const handleRemove = () => {
        subEntityList.splice(itemToRemove, 1);

        service
            .update(
                createEntityObject({
                    ...entity,
                    [`${entityAttribute}`]: [...subEntityList],
                })
            )
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
