import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

/**
 * This component renders a Grid container with Paper formatting, with a padding of 3 (MUI default measurement)
 *
 */

const PaperContainer = ({children, ...props}) => {
    return (
        <Grid container component={Paper} p={3} {...props}>
            {children}
        </Grid>
    );
};

export default PaperContainer;
