import {AuthAction} from "base/user/components";

import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

const SectionCardHeaderAction = ({name, text, icon, onClick, roles = []}) => {
    return (
        <AuthAction roles={roles}>
            <MenuItem key={name} onClick={onClick}>
                <ListItemIcon aria-label={name} name={name}>
                    {icon}
                </ListItemIcon>
                {text}
            </MenuItem>
        </AuthAction>
    );
};

export default SectionCardHeaderAction;
