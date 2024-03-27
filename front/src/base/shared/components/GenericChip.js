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
                        <Avatar sx={{backgroundColor: "white", fontWeight: "bold"}}>
                            {avatarText || "-"}
                        </Avatar>
                    </Tooltip>
                )
            }
            label={label}
            sx={{
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                fontSize: "0.75em",
                color: "white",
            }}
        />
    );
};

export default GenericChip;
