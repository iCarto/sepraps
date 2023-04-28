import {Fragment} from "react";
import {FormInputText, FormDatePicker, FormInputCurrency} from "base/form/components";

const ContractBidRequestFormFields = () => {
    return (
        <Fragment>
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
            <FormInputCurrency
                name="bid_request_budget"
                label="Monto estimado"
                rules={{required: "El campo es obligatorio"}}
            />
        </Fragment>
    );
};

export default ContractBidRequestFormFields;
