import {useState} from "react";

import {useNavigateWithReload} from "base/navigation/hooks";

import {MenuAction} from "base/ui/menu";
import {AlertError} from "base/error/components";
import {RemoveItemDialog} from "base/delete/components";

import LinkOffIcon from "@mui/icons-material/LinkOff";

export function useMenuGenericRemoveFromListAction(
    entity,
    entityAttribute,
    service,
    createEntityObject,
    entityAttributeId = "id"
) {
    const navigate = useNavigateWithReload();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [error, setError] = useState("");

    const subEntityList = entity[entityAttribute];

    const handleClickRemove = element => {
        console.log({element});
        setIsRemoveDialogOpen(true);
        if (entityAttribute) {
            setItemToRemove(
                subEntityList.findIndex(
                    item => item[entityAttributeId] === element[entityAttributeId]
                )
            );
        }
    };

    const handleRemove = () => {
        subEntityList.splice(itemToRemove, 1);
        const newEntityObject = createEntityObject({
            ...entity,
            [`${entityAttribute}`]: [...subEntityList],
        });
        console.log({newEntityObject});

        service
            .update(newEntityObject)
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
