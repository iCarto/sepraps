import {FormInputText, FormDatePicker, FormInputInteger} from "base/form/components";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";

const ContractBidRequestFormFields = () => {
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
