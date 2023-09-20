import {useNavigate} from "react-router-dom";

import {MenuAction} from "base/ui/menu";
import EditIcon from "@mui/icons-material/Edit";

export function useMenuGenericEditAction(handleClick = null) {
    const navigate = useNavigate();

    const handleClickEdit = element => {
        if (handleClick) {
            handleClick(element.id);
        } else {
            navigate(`edit/${element.id}`);
        }
    };

    const action = (
        <MenuAction
            key="menu-edit-action"
            icon={<EditIcon />}
            text="Modificar"
            handleClick={handleClickEdit}
        />
    );

    return {action};
}
