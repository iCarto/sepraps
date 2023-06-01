import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

const MenuAction = ({id, icon, text, element = null, handleClick = null}) => {
    const handleClickAction = () => {
        handleClick(element, id);
    };
    return (
        <MenuItem
            key={`${id}-${element?.id}`}
            name={id}
            aria-label={id}
            onClick={handleClickAction}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            {text}
        </MenuItem>
    );
};

export default MenuAction;
