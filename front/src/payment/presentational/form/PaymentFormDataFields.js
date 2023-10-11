import {
    FormDatePicker,
    FormInputInteger,
    FormInputText,
    FormSelect,
} from "base/form/components";
import Grid from "@mui/material/Grid";

const PaymentFormDataFields = () => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <FormInputText
                    name="name"
                    label="Nombre del pago"
                    rules={{required: "Este campo es obligatorio"}}
                />
                <FormInputInteger
                    name="expected_fixed_amount"
                    label="Monto previsto fijo"
                    endAdornment="Gs."
                />
                <FormInputInteger
                    name="expected_variable_amount"
                    label="Monto previsto variable"
                    endAdornment="Gs."
                />
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormSelect
                    name="status"
                    label="Estado"
                    rules={{required: "Este campo es obligatorio"}}
                    options={[
                        {label: "No pagado", value: "no_pagado"},
                        {label: "Pagado", value: "pagado"},
                    ]}
                />
                <FormDatePicker name="payment_date" label="Fecha de pago" />
                <FormInputInteger
                    name="fixed_amount"
                    label="Monto fijo"
                    endAdornment="Gs."
                    rules={{required: "Este campo es obligatorio"}}
                />
                <FormInputInteger
                    name="variable_amount"
                    label="Monto variable"
                    endAdornment="Gs."
                />
            </Grid>
        </Grid>
    );
};

export default PaymentFormDataFields;
