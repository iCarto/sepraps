import {theme} from "Theme";
import Typography from "@mui/material/Typography";

const LightHeading = ({children}) => {
    return (
        <Typography
            component="span"
            variant="overline"
            fontSize={16}
            color={theme.palette.grey[600]}
            lineHeight={1}
        >
            {children}
        </Typography>
    );
};

export default LightHeading;
