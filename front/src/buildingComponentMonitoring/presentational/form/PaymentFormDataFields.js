import {useDomain} from "sepraps/domain/provider";
import {
    FormBox,
    FormDatePicker,
    FormInputInteger,
    FormInputText,
    FormSelect,
} from "base/form/components";
import Grid from "@mui/material/Grid";
import {FIXED_VARIABLE_CRITERIA_TYPE} from "contract/model";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {useWatch} from "react-hook-form";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {NumberUtil} from "base/format/utilities";
import {PAYMENT_STATUS_PAID} from "payment/model";

const PaidAmountFormFields = ({contract}) => {
    const [paidTotalAmount, setPaidTotalAmount] = useState("");

    const paidFixedAmount = useWatch({
        name: "paid_fixed_amount",
    });
    const paidVariableAmount = useWatch({
        name: "paid_variable_amount",
    });

    useEffect(() => {
        if (paidFixedAmount || paidVariableAmount) {
            const paidFixedAmountValue = paidFixedAmount || 0;
            const paidVariableAmountValue = paidVariableAmount || 0;
            const fixedPlusVariable = NumberUtil.formatInteger(
                parseInt(paidFixedAmountValue) + parseInt(paidVariableAmountValue)
            );
            setPaidTotalAmount(fixedPlusVariable);
        } else {
            setPaidTotalAmount("");
        }
    }, [paidFixedAmount, paidVariableAmount]);

    return contract.payment_criteria_type === FIXED_VARIABLE_CRITERIA_TYPE ? (
        <>
            <FormInputInteger
                name="paid_fixed_amount"
                label="Monto pagado fijo"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "Este campo es obligatorio"}}
            />
            <FormInputInteger
                name="paid_variable_amount"
                label="Monto pagado variable"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "Este campo es obligatorio"}}
            />
            <TextField
                label="Monto pagado total"
                fullWidth
                disabled={true}
                value={paidTotalAmount}
                InputLabelProps={{shrink: true}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {CURRENCY_SYMBOL}
                        </InputAdornment>
                    ),
                }}
            />
        </>
    ) : (
        <FormInputInteger
            name="paid_total_amount"
            label="Monto pagado"
            endAdornment={CURRENCY_SYMBOL}
            rules={{required: "Este campo es obligatorio"}}
        />
    );
};

const ExpectedAmountFormFields = ({contract}) => {
    const [expectedTotalAmount, setExpectedTotalAmount] = useState("");

    const expectedFixedAmount = useWatch({
        name: "expected_fixed_amount",
    });
    const expectedVariableAmount = useWatch({
        name: "expected_variable_amount",
    });

    useEffect(() => {
        if (expectedFixedAmount || expectedVariableAmount) {
            const expectedFixedAmountValue = expectedFixedAmount || 0;
            const expectedVariableAmountValue = expectedVariableAmount || 0;
            const fixedPlusVariable = NumberUtil.formatInteger(
                parseInt(expectedFixedAmountValue) +
                    parseInt(expectedVariableAmountValue)
            );
            setExpectedTotalAmount(fixedPlusVariable);
        } else {
            setExpectedTotalAmount("");
        }
    }, [expectedFixedAmount, expectedVariableAmount]);

    return contract.payment_criteria_type === FIXED_VARIABLE_CRITERIA_TYPE ? (
        <>
            <FormInputInteger
                name="expected_fixed_amount"
                label="Monto previsto fijo"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "Este campo es obligatorio"}}
            />
            <FormInputInteger
                name="expected_variable_amount"
                label="Monto previsto variable"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "Este campo es obligatorio"}}
            />
            <TextField
                label="Monto previsto total"
                fullWidth
                disabled={true}
                value={expectedTotalAmount}
                InputLabelProps={{shrink: true}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {CURRENCY_SYMBOL}
                        </InputAdornment>
                    ),
                }}
            />
        </>
    ) : (
        <FormInputInteger
            name="expected_total_amount"
            label="Monto previsto"
            endAdornment={CURRENCY_SYMBOL}
            rules={{required: "Este campo es obligatorio"}}
        />
    );
};

const PaymentFormDataFields = ({contract}) => {
    const {paymentStatus} = useDomain();

    const status = useWatch({
        name: "status",
    });

    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                    <FormInputText
                        name="name"
                        label="Nombre del pago"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormSelect name="status" label="Estado" options={paymentStatus} />
                </Grid>
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormBox label="Previsto">
                    <FormDatePicker
                        name="expected_payment_date"
                        label="Fecha de pago prevista"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                    <ExpectedAmountFormFields contract={contract} />
                </FormBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                {status === PAYMENT_STATUS_PAID && (
                    <FormBox label="Real">
                        <FormDatePicker
                            name="payment_date"
                            label="Fecha de pago"
                            rules={{required: "Este campo es obligatorio"}}
                        />
                        <PaidAmountFormFields contract={contract} />
                    </FormBox>
                )}
            </Grid>
        </Grid>
    );
};

export default PaymentFormDataFields;
