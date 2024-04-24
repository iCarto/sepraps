import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

const Spinner = ({small = false}) => {
    return (
        <Grid container justifyContent="center" my={small ? 2 : 6}>
            <CircularProgress size={small ? 20 : 40} />
        </Grid>
    );
};

export default Spinner;
