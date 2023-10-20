import {useDomain} from "sepraps/domain/provider";
import {
    FormBox,
    FormDatePicker,
    FormInputInteger,
    FormInputText,
    FormSelect,
} from "base/form/components";
import Grid from "@mui/material/Grid";

const PaymentFormDataFields = () => {
    const {paymentStatus} = useDomain();

    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} direction="column">
                <FormInputText
                    name="name"
                    label="Nombre del pago"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormBox label="Previsto">
                    <FormDatePicker
                        name="expected_payment_date"
                        label="Fecha de pago prevista"
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
                    <FormInputInteger
                        name="expected_total_amount"
                        label="Monto previsto"
                        endAdornment="Gs."
                    />
                </FormBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormBox label="Real">
                    <FormSelect name="status" label="Estado" options={paymentStatus} />
                    <FormDatePicker name="payment_date" label="Fecha de pago" />
                    <FormInputInteger
                        name="paid_fixed_amount"
                        label="Monto fijo pagado"
                        endAdornment="Gs."
                    />
                    <FormInputInteger
                        name="paid_variable_amount"
                        label="Monto variable pagado"
                        endAdornment="Gs."
                    />
                    <FormInputInteger
                        name="paid_total_amount"
                        label="Monto pagado"
                        endAdornment="Gs."
                    />
                </FormBox>
            </Grid>
        </Grid>
    );
};

export default PaymentFormDataFields;
