import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

const Spinner = () => {
    return (
        <Grid container justifyContent="center" my={6}>
            <CircularProgress size={40} />
        </Grid>
    );
};

export default Spinner;
