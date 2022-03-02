import {Fragment} from "react";
import {
    FormInputText,
    FormDatePicker,
    FormInputDecimal,
    FormInputInteger,
} from "components/common/form";

const ContractBidRequestFormFields = () => {
    return (
        <Fragment>
            <FormInputText
                name="bid_request_number"
                label="Número de llamado"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputText
                name="bid_request_id"
                label="ID llamado"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormDatePicker
                name="bid_request_date"
                label="Fecha de llamado"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputDecimal
                name="bid_request_budget"
                label="Monto total"
                endAdornment="$"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputInteger
                name="bid_request_deadline"
                label="Plazo previsto"
                endAdornment="meses"
                rules={{required: "El campo es obligatorio"}}
            />
        </Fragment>
    );
};

export default ContractBidRequestFormFields;
