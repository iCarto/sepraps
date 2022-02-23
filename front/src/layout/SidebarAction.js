import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

const SidebarAction = ({name, text, icon, onClick}) => {
    return (
        <MenuItem onClick={onClick}>
            <ListItemIcon aria-label={name} name={name}>
                {icon}
            </ListItemIcon>
            {text}
        </MenuItem>
    );
};

export default SidebarAction;
