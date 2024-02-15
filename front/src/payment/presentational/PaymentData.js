import {FIXED_VARIABLE_CRITERIA_TYPE} from "contract/model";
import {PRODUCT_STATUS_PAID, PRODUCT_STATUS_PENDING} from "payment/model";
import {DateUtil, NumberUtil} from "base/format/utilities";

import {PaymentDataProgress} from ".";
import {SectionBox, SectionField} from "base/ui/section/components";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

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
                label="Monto aprobado fijo"
                value={NumberUtil.formatInteger(payment.paid_fixed_amount)}
                unit="Gs."
            />
            <SectionField
                label="Monto aprobado variable"
                value={NumberUtil.formatInteger(payment.paid_variable_amount)}
                unit="Gs."
            />
            <SectionField
                label="Monto aprobado total"
                value={NumberUtil.formatInteger(payment.paid_total_amount)}
                unit="Gs."
            />
        </>
    ) : (
        <SectionField
            label="Monto aprobado"
            value={NumberUtil.formatInteger(payment.paid_total_amount)}
            unit="Gs."
        />
    );
};

const PaymentData = ({payment}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Previsión">
                    <SectionField
                        label="Fecha de aprobación prevista"
                        value={DateUtil.formatDate(payment.expected_approval_date)}
                    />
                    <ExpectedAmountSection payment={payment} />
                </SectionBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                {payment.status === PRODUCT_STATUS_PENDING && (
                    <SectionBox label="Resultado">
                        <Stack
                            direction="row"
                            justifyContent="space-around"
                            sx={{my: 1}}
                        >
                            <PaymentDataProgress
                                label="Previsto"
                                value={
                                    NumberUtil.formatDecimal(
                                        payment.expected_awarded_contract_percentage,
                                        0
                                    ) || 0
                                }
                                color="expected"
                            />
                            <PaymentDataProgress
                                label="Acumulado previsto"
                                value={
                                    NumberUtil.formatDecimal(
                                        payment.expected_awarded_contract_percentage_cumulative,
                                        0
                                    ) || 0
                                }
                                color="expected"
                            />
                        </Stack>
                        <Divider />
                        <SectionField
                            label="Monto acumulado previsto"
                            value={NumberUtil.formatInteger(
                                payment.expected_total_amount_cumulative
                            )}
                            unit="Gs."
                            valueCustomStyle={{
                                fontWeight: "bold",
                                color: "grey.800",
                            }}
                        />
                    </SectionBox>
                )}
                {payment.status === PRODUCT_STATUS_PAID && (
                    <>
                        <SectionBox label="Aprobación">
                            <SectionField
                                label="Fecha de aprobación"
                                value={DateUtil.formatDate(payment.approval_date)}
                            />
                            <PaidAmountSection payment={payment} />
                        </SectionBox>

                        <SectionBox label="Resultado">
                            <Stack
                                direction="row"
                                justifyContent="space-around"
                                sx={{my: 1}}
                            >
                                <PaymentDataProgress
                                    label="Previsto"
                                    value={payment.paid_awarded_contract_percentage}
                                />
                                <PaymentDataProgress
                                    label="Acumulado total"
                                    value={
                                        payment.paid_awarded_contract_percentage_cumulative
                                    }
                                />
                            </Stack>
                            <Divider />
                            <SectionField
                                label="Monto acumulado aprobado"
                                value={NumberUtil.formatInteger(
                                    payment.paid_total_amount_cumulative
                                )}
                                unit="Gs."
                                valueCustomStyle={{
                                    fontWeight: "bold",
                                    color: "grey.800",
                                }}
                            />
                        </SectionBox>
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default PaymentData;
