import {useWatch} from "react-hook-form";
import {
    FormInputText,
    FormDatePicker,
    FormInputInteger,
    FormSelect,
} from "base/form/components";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {useDomain} from "sepraps/domain/provider";
import {MAX_MIN_AMOUNT_TYPE} from "contract/model";
import Grid from "@mui/material/Grid";

const BidRequestBudgetFormFields = ({totalAmountType}) => {
    return totalAmountType === MAX_MIN_AMOUNT_TYPE ? (
        <>
            <FormInputInteger
                key="max_min_bid_request_budget_min"
                name="bid_request_budget_min"
                label="Monto mínimo licitado"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputInteger
                key="max_min_bid_request_budget_min"
                name="bid_request_budget"
                label="Monto máximo licitado"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "El campo es obligatorio"}}
            />
        </>
    ) : (
        <FormInputInteger
            key="bid_request_budget"
            name="bid_request_budget"
            label="Monto licitado"
            endAdornment={CURRENCY_SYMBOL}
            rules={{required: "El campo es obligatorio"}}
        />
    );
};

const ContractBidRequestFormFields = () => {
    const {totalAmountTypes, productFrequencyTypes, paymentCriteriaTypes} = useDomain();

    const totalAmountType = useWatch({
        name: "total_amount_type",
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormInputText
                    name="bid_request_number"
                    label="Número"
                    rules={{required: "El campo es obligatorio"}}
                />
                <FormInputText
                    name="bid_request_id"
                    label="Identificador"
                    rules={{required: "El campo es obligatorio"}}
                />
                <FormInputText name="bid_request_lot_number" label="Número de lote" />
                <FormDatePicker
                    name="bid_request_date"
                    label="Fecha de publicación"
                    rules={{required: "El campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={6}>
                <FormSelect
                    name="total_amount_type"
                    label="Tipo de monto"
                    options={totalAmountTypes}
                    rules={{required: "El campo es obligatorio"}}
                />
                <BidRequestBudgetFormFields totalAmountType={totalAmountType} />
                <FormSelect
                    name="product_frequency_type"
                    label="Frecuencia de entrega de productos"
                    options={productFrequencyTypes}
                    rules={{required: "El campo es obligatorio"}}
                />
                <FormSelect
                    name="payment_criteria_type"
                    label="Criterio de pago"
                    options={paymentCriteriaTypes}
                    rules={{required: "El campo es obligatorio"}}
                />
            </Grid>
        </Grid>
    );
};

export default ContractBidRequestFormFields;
