import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

const MenuAction = ({key, icon, text, element = null, handleClick = null}) => {
    const handleClickAction = () => {
        handleClick(element, key);
    };
    return (
        <MenuItem
            key={`${key}-${element?.id}`}
            aria-label={key}
            onClick={handleClickAction}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            {text}
        </MenuItem>
    );
};

export default MenuAction;
