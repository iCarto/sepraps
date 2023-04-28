import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

const MenuAction = ({name, icon, text, itemId = null, handleClick = null}) => {
    const onClick = itemId => {
        handleClick(itemId, name);
    };
    return (
        <MenuItem key={name} aria-label={name} onClick={() => onClick(itemId)}>
            <ListItemIcon>{icon}</ListItemIcon>
            {text}
        </MenuItem>
    );
};

export default MenuAction;
