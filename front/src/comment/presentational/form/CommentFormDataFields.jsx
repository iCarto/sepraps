import {FormTextArea} from "base/form/components";
import Grid from "@mui/material/Grid";

const PaymentFormDataFields = () => {
    return (
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={10} lg={8}>
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
