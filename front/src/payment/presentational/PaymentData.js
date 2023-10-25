import {FIXED_VARIABLE_CRITERIA_TYPE} from "contract/model";
import {SectionBox, SectionField} from "base/ui/section/components";
import {DateUtil, NumberUtil} from "base/format/utilities";
import Grid from "@mui/material/Grid";
import {PaymentStatusChip} from ".";
import Divider from "@mui/material/Divider";

const ExpectedAmountSection = ({payment}) => {
    return payment.contract_payment_criteria_type === FIXED_VARIABLE_CRITERIA_TYPE ? (
        <>
            <SectionField
                label="Monto previsto fijo"
                value={NumberUtil.formatInteger(payment.expected_fixed_amount)}
                unit="Gs."
            />
            <SectionField
                label="Monto previsto variable"
                value={NumberUtil.formatInteger(payment.expected_variable_amount)}
                unit="Gs."
            />
            <SectionField
                label="Monto previsto total"
                value={NumberUtil.formatInteger(payment.expected_total_amount)}
                unit="Gs."
            />
        </>
    ) : (
        <SectionField
            label="Monto previsto"
            value={NumberUtil.formatInteger(payment.expected_total_amount)}
            unit="Gs."
        />
    );
};

const PaidAmountSection = ({payment}) => {
    return payment.contract_payment_criteria_type === FIXED_VARIABLE_CRITERIA_TYPE ? (
        <>
            <SectionField
                label="Monto fijo pagado"
                value={NumberUtil.formatInteger(payment.paid_fixed_amount)}
                unit="Gs."
            />
            <SectionField
                label="Monto variable pagado"
                value={NumberUtil.formatInteger(payment.paid_variable_amount)}
                unit="Gs."
            />
            <SectionField
                label="Monto pagado total"
                value={NumberUtil.formatInteger(payment.paid_total_amount)}
                unit="Gs."
            />
        </>
    ) : (
        <SectionField
            label="Monto pagado"
            value={NumberUtil.formatInteger(payment.paid_total_amount)}
            unit="Gs."
        />
    );
};

const PaymentData = ({payment}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Previsto">
                    <SectionField
                        label="Fecha de pago prevista"
                        value={DateUtil.formatDate(payment.expected_payment_date)}
                    />
                    <ExpectedAmountSection payment={payment} />
                    <SectionField
                        label="% Previsto"
                        value={NumberUtil.formatDecimal(
                            payment.expected_total_contract_percentage
                        )}
                        unit="%"
                    />
                    <Divider sx={{my: 1}} />
                    <SectionField
                        label="Monto acumulado previsto"
                        value={NumberUtil.formatInteger(
                            payment.expected_total_amount_cumulative
                        )}
                        unit="Gs."
                    />
                    <SectionField
                        label="% Acumulado previsto"
                        value={NumberUtil.formatDecimal(
                            payment.expected_total_contract_percentage_cumulative
                        )}
                        unit="%"
                    />
                    <Divider sx={{my: 1}} />
                    <SectionField
                        label="Monto total previsto"
                        value={NumberUtil.formatInteger(
                            payment.expected_total_contract_amount
                        )}
                        unit="Gs."
                    />
                </SectionBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Real">
                    <SectionField
                        label="Estado"
                        value={
                            <PaymentStatusChip
                                label={payment.status_label}
                                value={payment.status}
                            />
                        }
                    />
                    <SectionField
                        label="Fecha de pago"
                        value={DateUtil.formatDate(payment.payment_date)}
                    />
                    <PaidAmountSection payment={payment} />
                    <SectionField
                        label="% Pagado"
                        value={NumberUtil.formatDecimal(
                            payment.paid_total_contract_percentage
                        )}
                        unit="%"
                    />
                    <Divider sx={{my: 1}} />
                    <SectionField
                        label="Monto acumulado pagado"
                        value={NumberUtil.formatInteger(
                            payment.paid_total_amount_cumulative
                        )}
                        unit="Gs."
                    />
                    <SectionField
                        label="% Acumulado pagado"
                        value={NumberUtil.formatDecimal(
                            payment.paid_total_contract_percentage_cumulative
                        )}
                        unit="%"
                    />
                </SectionBox>
            </Grid>
        </Grid>
    );
};

export default PaymentData;
