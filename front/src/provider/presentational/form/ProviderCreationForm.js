import {ProviderFormGeneralDataFields} from ".";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProviderCreationForm = ({onSubmit, onCancel = null}) => {
    return (
        <>
            <ProviderFormGeneralDataFields orientation={onCancel ? "row" : "column"} />
            <Grid container justifyContent="center" sx={{mt: 2}}>
                {onCancel && (
                    <Button sx={{ml: 2}} onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ml: 3}}
                    onClick={() => onSubmit()}
                >
                    Guardar
                </Button>
            </Grid>
        </>
    );
};

export default ProviderCreationForm;
