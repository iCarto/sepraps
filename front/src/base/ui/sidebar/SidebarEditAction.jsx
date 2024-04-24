import {AuthAction} from "base/user/components";
import {SidebarAction} from ".";

import EditIcon from "@mui/icons-material/Edit";

const SidebarEditAction = ({onClick, roles = []}) => {
    return (
        <AuthAction key="edit-entity" roles={roles}>
            <SidebarAction
                name="edit-entity"
                text="Modificar"
                icon={<EditIcon />}
                onClick={() => onClick()}
            />
        </AuthAction>
    );
};

export default SidebarEditAction;
