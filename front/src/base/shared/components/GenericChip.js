import {theme} from "Theme";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const GenericChip = ({label, icon = null, avatar = null}) => {
    return (
        <Chip
            avatar={avatar && <Avatar sx={{fontWeight: "bold"}}>{avatar}</Avatar>}
            icon={icon ? icon : null}
            label={label}
            sx={{
                backgroundColor: "grey.300",
                fontSize: "0.75em",
            }}
        />
    );
};

export default GenericChip;
