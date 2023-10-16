import {SectionBox, SectionField} from "base/ui/section/components";
import {DateUtil, NumberUtil} from "base/format/utilities";
import Grid from "@mui/material/Grid";
import {PaymentAppraisalChip, PaymentStatusChip} from ".";

const PaymentData = ({payment}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SectionField
                    label="Estado"
                    value={
                        <PaymentStatusChip
                            label={payment.status_label}
                            value={payment.status}
                        />
                    }
                />
            </Grid>
            <Grid item xs={6} />
            <Grid container item xs={6} direction="column">
                <SectionBox label="Previsión">
                    <SectionField
                        label="Monto previsto fijo"
                        value={NumberUtil.formatInteger(payment.expected_fixed_amount)}
                        unit="Gs."
                    />
                    <SectionField
                        label="Monto previsto variable"
                        value={NumberUtil.formatInteger(
                            payment.expected_variable_amount
                        )}
                        unit="Gs."
                    />
                </SectionBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Pago">
                    <SectionField
                        label="Monto fijo"
                        value={NumberUtil.formatInteger(payment.fixed_amount)}
                        unit="Gs."
                    />
                    <SectionField
                        label="Monto variable"
                        value={NumberUtil.formatInteger(payment.variable_amount)}
                        unit="Gs."
                    />
                    <SectionField
                        label="Fecha de pago"
                        value={DateUtil.formatDate(payment.payment_date)}
                    />
                </SectionBox>
            </Grid>
        </Grid>
    );
};

export default PaymentData;
