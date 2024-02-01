import {useWatch} from "react-hook-form";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {FormDatePicker, FormInputInteger} from "base/form/components";
import {MAX_MIN_AMOUNT_TYPE} from "contract/model";
import Grid from "@mui/material/Grid";

const AwardingBudgetFormFields = ({totalAmountType}) => {
    return totalAmountType === MAX_MIN_AMOUNT_TYPE ? (
        <>
            <FormInputInteger
                key="max_min_awarding_budget_min"
                name="awarding_budget_min"
                label="Monto mínimo adjudicado"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputInteger
                key="max_min_awarding_budget"
                name="awarding_budget"
                label="Monto máximo adjudicado"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "El campo es obligatorio"}}
            />
        </>
    ) : (
        <FormInputInteger
            key="awarding_budget"
            name="awarding_budget"
            label="Monto adjudicado"
            endAdornment={CURRENCY_SYMBOL}
            rules={{required: "El campo es obligatorio"}}
        />
    );
};

const ContractAwardingFormFields = () => {
    const totalAmountType = useWatch({
        name: "total_amount_type",
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormDatePicker
                    name="awarding_date"
                    label="Fecha de adjudicación"
                    rules={{required: "El campo es obligatorio"}}
                />
                <FormInputInteger
                    name="expected_execution_period"
                    label="Plazo previsto de ejecución"
                    endAdornment="días"
                />
            </Grid>
            <Grid item xs={6}>
                <AwardingBudgetFormFields totalAmountType={totalAmountType} />
            </Grid>
        </Grid>
    );
};

export default ContractAwardingFormFields;
