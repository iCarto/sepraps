import {FIXED_VARIABLE_CRITERIA_TYPE, MAX_MIN_AMOUNT_TYPE} from "contract/model";
import {SectionBox, SectionField} from "base/ui/section/components";
import {DateUtil, NumberUtil} from "base/format/utilities";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {PRODUCT_STATUS_PAID, PRODUCT_STATUS_PENDING} from "payment/model";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {theme} from "Theme";
import {PaymentDataProgress} from ".";
import Paper from "@mui/material/Paper";
import {LightHeading} from "base/ui/headings/components";

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
                    {payment.status === PRODUCT_STATUS_PENDING && (
                        <Paper
                            elevation={1}
                            sx={{mt: 2, p: 2, backgroundColor: "grey.50"}}
                        >
                            <LightHeading>Resultado</LightHeading>
                            <Stack
                                direction="row"
                                justifyContent="space-around"
                                sx={{my: 1}}
                            >
                                <PaymentDataProgress
                                    label="Previsto"
                                    value={NumberUtil.formatDecimal(
                                        payment.expected_awarded_contract_percentage,
                                        0
                                    )}
                                    color="expected"
                                />
                                <PaymentDataProgress
                                    label="Acumulado previsto"
                                    value={NumberUtil.formatDecimal(
                                        payment.expected_awarded_contract_percentage_cumulative,
                                        0
                                    )}
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
                                    fontSize: "1.1em",
                                    color: "grey.500",
                                }}
                            />
                        </Paper>
                    )}
                </SectionBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                {payment.status === PRODUCT_STATUS_PAID && (
                    <SectionBox label="Aprobación">
                        <SectionField
                            label="Fecha de aprobación"
                            value={DateUtil.formatDate(payment.approval_date)}
                        />
                        <PaidAmountSection payment={payment} />
                        <Paper
                            elevation={1}
                            sx={{mt: 2, p: 2, backgroundColor: "grey.50"}}
                        >
                            <LightHeading>Resultado</LightHeading>
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
                                    fontSize: "1.1em",
                                    color: "grey.500",
                                }}
                            />
                        </Paper>
                    </SectionBox>
                )}
            </Grid>
        </Grid>
    );
};

export default PaymentData;
