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
            <FormInputText name="bid_request_number" label="Número de llamado" />
            <FormInputText name="bid_request_id" label="ID llamado" />
            <FormDatePicker name="bid_request_date" label="Fecha de llamado" />
            <FormInputDecimal
                name="bid_request_budget"
                label="Monto total"
                endAdornment="$"
            />
            <FormInputInteger name="bid_request_deadline" label="Plazo previsto" />
        </Fragment>
    );
};

export default ContractBidRequestFormFields;
