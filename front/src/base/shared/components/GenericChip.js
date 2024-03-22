import {theme} from "Theme";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const GenericChip = ({label, iconSrc = null, avatarText = null, tooltipText = ""}) => {
    return (
        <Chip
            avatar={
                iconSrc ? (
                    <Tooltip title={tooltipText}>
                        <Avatar sx={{backgroundColor: "white", p: 0.4}} src={iconSrc} />
                    </Tooltip>
                ) : (
                    <Tooltip title={tooltipText}>
                        <Avatar sx={{fontWeight: "bold"}}>{avatarText || "-"}</Avatar>
                    </Tooltip>
                )
            }
            label={label}
            sx={{
                backgroundColor: "grey.300",
                fontSize: "0.75em",
            }}
        />
    );
};

export default GenericChip;
