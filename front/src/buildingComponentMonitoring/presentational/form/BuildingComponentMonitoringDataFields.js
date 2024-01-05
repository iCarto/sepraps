import {useWatch} from "react-hook-form";

import {NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {
    COMPONENT_EXECUTION_STATUS_COMPLETED,
    COMPONENT_EXECUTION_STATUS_IN_PROGRESS,
} from "component/config";
import {useDomain} from "sepraps/domain/provider";

import {
    FormBox,
    FormDatePicker,
    FormInputInteger,
    FormSelect,
} from "base/form/components";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const PendingAmountField = ({executionStatus}) => {
    return executionStatus === COMPONENT_EXECUTION_STATUS_COMPLETED ? (
        <TextField
            label="Monto pendiente"
            name="pending_amount"
            value={"0"}
            disabled={true}
            InputLabelProps={{shrink: true}}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">{CURRENCY_SYMBOL}</InputAdornment>
                ),
            }}
            fullWidth
        />
    ) : (
        <FormInputInteger
            name="pending_amount"
            label="Monto pendiente"
            endAdornment={CURRENCY_SYMBOL}
            rules={{required: "Este campo es obligatorio"}}
        />
    );
};

const BuildingComponentMonitoringDataFields = () => {
    const {executionStatusTypes, qualityStatusTypes} = useDomain();

    const execution_status = useWatch({
        name: "execution_status",
    });
    const expected_amount = useWatch({
        name: "expected_amount",
    });
    const paid_amount = useWatch({
        name: "paid_amount",
    });
    const pending_amount = useWatch({
        name: "pending_amount",
    });

    const totalAmount =
        execution_status === COMPONENT_EXECUTION_STATUS_COMPLETED
            ? paid_amount
            : (parseFloat(paid_amount) || 0) + (parseFloat(pending_amount) || 0);

    const financialProgressPercentage = NumberUtil.formatFloat(
        ((parseFloat(totalAmount) || 0) / (parseFloat(expected_amount) || 0)) * 100
    );

    const displayMonitoringFields =
        execution_status === COMPONENT_EXECUTION_STATUS_IN_PROGRESS ||
        execution_status === COMPONENT_EXECUTION_STATUS_COMPLETED;

    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                    <FormSelect
                        name="execution_status"
                        label="Estado de ejecución"
                        options={executionStatusTypes}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormSelect
                        name="quality_status"
                        label="Estado cualitativo"
                        options={qualityStatusTypes}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormBox label="Previsión inicial">
                    <FormDatePicker
                        name="expected_end_date"
                        label="Fecha de finalización prevista"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                    <FormInputInteger
                        name="expected_amount"
                        label="Monto previsto"
                        endAdornment={CURRENCY_SYMBOL}
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </FormBox>
            </Grid>
            {displayMonitoringFields ? (
                <Grid container item xs={6} direction="column">
                    <FormBox label="Seguimiento">
                        {execution_status === COMPONENT_EXECUTION_STATUS_COMPLETED && (
                            <FormDatePicker
                                name="real_end_date"
                                label="Fecha de finalización real"
                                rules={{required: "Este campo es obligatorio"}}
                            />
                        )}
                        <FormInputInteger
                            name="paid_amount"
                            label="Monto real actual"
                            endAdornment={CURRENCY_SYMBOL}
                            rules={{required: "Este campo es obligatorio"}}
                        />
                        <PendingAmountField executionStatus={execution_status} />
                        <TextField
                            label="Monto total"
                            value={totalAmount}
                            disabled={true}
                            InputLabelProps={{shrink: true}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {CURRENCY_SYMBOL}
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                        <TextField
                            label="Porcentaje de avance financiero"
                            value={financialProgressPercentage}
                            disabled={true}
                            InputLabelProps={{shrink: true}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">%</InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                        <FormInputInteger
                            name="physical_progress_percentage"
                            label="Porcentaje de avance físico"
                            endAdornment={"%"}
                            rules={{required: "Este campo es obligatorio"}}
                        />
                    </FormBox>
                </Grid>
            ) : null}
        </Grid>
    );
};

export default BuildingComponentMonitoringDataFields;
