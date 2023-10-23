import {
    FormInputText,
    FormDatePicker,
    FormInputInteger,
    FormSelect,
} from "base/form/components";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {useDomain} from "sepraps/domain/provider";

const ContractBidRequestFormFields = () => {
    const {totalAmountTypes, paymentFrequencyTypes, paymentCriteriaTypes} = useDomain();
    return (
        <>
            <FormInputText
                name="bid_request_number"
                label="Número de licitación"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputText
                name="bid_request_id"
                label="Identificador de licitación"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormDatePicker
                name="bid_request_date"
                label="Fecha de publicación"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormSelect
                name="total_amount_type"
                label="Tipo de monto"
                options={totalAmountTypes}
                rules={{required: "El campo es obligatorio"}}
            />
            <FormSelect
                name="payment_frequency_type"
                label="Frecuencia de pago"
                options={paymentFrequencyTypes}
                rules={{required: "El campo es obligatorio"}}
            />
            <FormSelect
                name="payment_criteria_type"
                label="Criterio de pago"
                options={paymentCriteriaTypes}
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputInteger
                name="bid_request_budget"
                label="Monto estimado"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "El campo es obligatorio"}}
            />
        </>
    );
};

export default ContractBidRequestFormFields;
