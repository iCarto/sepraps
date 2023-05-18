import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const EntityForm = ({children, onSubmit, onCancel = null}) => {
    return (
        <Box component="form" width="100%">
            {children}
            <Grid container justifyContent="center" spacing={2} sx={{mt: 2}}>
                {onCancel && (
                    <Grid item>
                        <Button onClick={onCancel}>Cancelar</Button>
                    </Grid>
                )}
                <Grid item>
                    <Button variant="contained" onClick={() => onSubmit()}>
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EntityForm;
