import {EntityFormSubmitButton} from ".";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useState} from "react";

const EntityForm = ({children, onSubmit, onCancel = null}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        console.log("START submitting");
        onSubmit().finally(response => {
            setIsSubmitting(false);
            console.log("END submitting");
            return response;
        });
    };
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
                        onSubmit={handleSubmit}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default EntityForm;
