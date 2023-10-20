import {FormDatePicker, FormInputText, FormSelect} from "base/form/components";
import Grid from "@mui/material/Grid";

const PaymentFormDataFields = () => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} direction="column">
                <FormInputText
                    name="name"
                    label="Nombre del producto"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormSelect
                    name="status"
                    label="Estado"
                    rules={{required: "Este campo es obligatorio"}}
                    options={[
                        {label: "No entregado", value: "no_entregado"},
                        {label: "Entregado", value: "entregado"},
                        {label: "Revisado", value: "revisado"},
                        {label: "Validado", value: "validado"},
                    ]}
                />
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormDatePicker
                    name="presentation_date"
                    label="Fecha de presentación"
                />
            </Grid>
        </Grid>
    );
};

export default PaymentFormDataFields;
