import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FormSection = ({title = "", ...props}) => {
    return (
        <Paper sx={{mt: 3, p: 3}} elevation={3}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">{title}</Typography>
                </Grid>
                <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    xs={12}
                >
                    {props.children}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FormSection;
