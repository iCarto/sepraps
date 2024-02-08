import {EntityFormSubmitButton} from ".";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const EntityFormHorizontal = ({
    children,
    onSubmit,
    onCancel = null,
    isSubmitting = false,
}) => {
    return (
        <Grid
            component="form"
            container
            width="100%"
            direction="row"
            alignItems="center"
        >
            <Grid item flexGrow={1}>
                {children}
            </Grid>
            <Grid item xs container justifyContent="center" spacing={1}>
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
        </Grid>
    );
};

export default EntityFormHorizontal;
