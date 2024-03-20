import {theme} from "Theme";
import Chip from "@mui/material/Chip";

const GenericChip = ({label, icon = null}) => {
    return (
        <Chip
            icon={icon}
            label={label}
            variant="outlined"
            sx={{
                color: "white",
                backgroundColor: theme.palette.primary.dark,
            }}
        />
    );
};

export default GenericChip;
