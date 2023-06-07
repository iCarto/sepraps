import {
    useMenuGenericDeleteAction,
    useMenuGenericEditAction,
    useMenuGenericViewAction,
} from "base/ui/menu/hooks";

export function useMenuGenericDefaultActions(service) {
    const {action: viewAction} = useMenuGenericViewAction();
    const {action: editAction} = useMenuGenericEditAction();
    const {action: deleteAction, dialog: deleteDialog} = useMenuGenericDeleteAction(
        service
    );

    const actions = [viewAction, editAction, deleteAction];

    return {actions, deleteDialog};
}
