import {AuthAction} from "base/user/components";
import {SidebarAction} from ".";

import LinkOffIcon from "@mui/icons-material/LinkOff";

const SidebarRemoveAction = ({onClick, roles = []}) => {
    return (
        <AuthAction key="remove-entity" roles={roles}>
            <SidebarAction
                name="remove-entity"
                text="Quitar"
                icon={<LinkOffIcon />}
                onClick={() => onClick()}
            />
        </AuthAction>
    );
};

export default SidebarRemoveAction;
