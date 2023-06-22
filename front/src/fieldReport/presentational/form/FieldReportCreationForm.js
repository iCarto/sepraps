import {FieldReportFormGeneralDataFields} from ".";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const FieldReportCreationForm = ({onSubmit, onCancel = null}) => {
    return (
        <>
            <Grid container justifyContent="center" sx={{mt: 2}} rowSpacing={2}>
                <FieldReportFormGeneralDataFields
                    orientation={onCancel ? "row" : "column"}
                />
                <Grid item>
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
            </Grid>
        </>
    );
};

export default FieldReportCreationForm;
