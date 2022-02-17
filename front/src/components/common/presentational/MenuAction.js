import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

const MenuAction = ({name, icon, text, rowId = null, handleClick = null}) => {
    const onClick = rowId => {
        handleClick(rowId, name);
    };
    return (
        <MenuItem
            key={name}
            name={name}
            aria-label={name}
            onClick={() => onClick(rowId)}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            {text}
        </MenuItem>
    );
};

export default MenuAction;
