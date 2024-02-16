import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {PaymentFormSearch} from "payment/presentational/form";
import {FormBox, FormInputInteger, FormTextArea} from "base/form/components";
import Grid from "@mui/material/Grid";

const CertificationFormDataFields = ({contractId}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <FormBox label="Previsión">
                    <FormInputInteger
                        name="expected_amount"
                        label="Monto previsto"
                        endAdornment={CURRENCY_SYMBOL}
                    />
                </FormBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormBox label="Aprobación">
                    <PaymentFormSearch contractId={contractId} isRequired />
                    <FormInputInteger
                        name="approved_amount"
                        label="Monto aprobado"
                        endAdornment={CURRENCY_SYMBOL}
                        rules={{required: "Este campo es obligatorio"}}
                    />
                    <FormTextArea name="notes" label="Observaciones" maxLength={500} />
                </FormBox>
            </Grid>
        </Grid>
    );
};

export default CertificationFormDataFields;
