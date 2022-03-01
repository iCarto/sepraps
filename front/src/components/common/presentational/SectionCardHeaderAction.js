import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

const SectionCardHeaderAction = ({name, text, icon, onClick}) => {
    return (
        <MenuItem key={name} onClick={onClick}>
            <ListItemIcon aria-label={name} name={name}>
                {icon}
            </ListItemIcon>
            {text}
        </MenuItem>
    );
};

export default SectionCardHeaderAction;
