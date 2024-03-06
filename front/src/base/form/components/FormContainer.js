import {theme} from "Theme";
import Grid from "@mui/material/Grid";

const FormContainer = ({children, style = {}}) => {
    return (
        <Grid
            container
            flexDirection="column"
            p={1}
            border={1}
            borderColor={"primary.main"}
            borderRadius={1}
            sx={{backgroundColor: theme.palette.pageBackground.secondary, ...style}}
        >
            {children}
        </Grid>
    );
};

export default FormContainer;
