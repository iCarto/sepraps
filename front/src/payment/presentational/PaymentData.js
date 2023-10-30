import {FIXED_VARIABLE_CRITERIA_TYPE, MAX_MIN_AMOUNT_TYPE} from "contract/model";
import {SectionBox, SectionField} from "base/ui/section/components";
import {DateUtil, NumberUtil} from "base/format/utilities";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {PAYMENT_STATUS_PAID} from "payment/model";

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
                label="Monto pagado fijo"
                value={NumberUtil.formatInteger(payment.paid_fixed_amount)}
                unit="Gs."
            />
            <SectionField
                label="Monto pagado variable"
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
                        label="Porcentaje previsto"
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
                        label="Porcentaje acumulado previsto"
                        value={NumberUtil.formatDecimal(
                            payment.expected_total_contract_percentage_cumulative
                        )}
                        unit="%"
                    />
                    <Divider sx={{my: 1}} />
                    <SectionField
                        label={
                            payment.contract_total_amount_type === MAX_MIN_AMOUNT_TYPE
                                ? "Monto adjudicado máximo"
                                : "Monto adjudicado"
                        }
                        value={NumberUtil.formatInteger(
                            payment.expected_total_contract_amount
                        )}
                        unit="Gs."
                    />
                </SectionBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                {payment.status === PAYMENT_STATUS_PAID && (
                    <SectionBox label="Real">
                        <SectionField
                            label="Fecha de pago"
                            value={DateUtil.formatDate(payment.payment_date)}
                        />
                        <PaidAmountSection payment={payment} />
                        <SectionField
                            label="Porcentaje pagado"
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
                            label="Porcentaje acumulado pagado"
                            value={NumberUtil.formatDecimal(
                                payment.paid_total_contract_percentage_cumulative
                            )}
                            unit="%"
                        />
                    </SectionBox>
                )}
            </Grid>
        </Grid>
    );
};

export default PaymentData;
