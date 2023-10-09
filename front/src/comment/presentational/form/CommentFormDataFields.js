import {FormTextArea} from "base/form/components";
import Grid from "@mui/material/Grid";

const PaymentFormDataFields = () => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <FormTextArea
                    name="text"
                    label="Comentario"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
        </Grid>
    );
};

export default PaymentFormDataFields;
