import {EntityFormSubmitButton} from ".";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const EntityForm = ({children, onSubmit, onCancel = null, isSubmitting = false}) => {
    return (
        <Box component="form" width="100%">
            {children}
            <Grid container justifyContent="center" spacing={2} sx={{mt: 1}}>
                {onCancel && (
                    <Grid item>
                        <Button
                            onClick={onCancel}
                            variant="outlined"
                            sx={{backgroundColor: "white"}}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                )}
                <Grid item>
                    <EntityFormSubmitButton
                        isSubmitting={isSubmitting}
                        onSubmit={onSubmit}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default EntityForm;
