import {Fragment} from "react";
import {FormDatePicker, FormInputCurrency} from "base/form/components";

const ContractAwardingFormFields = () => {
    return (
        <Fragment>
            <FormInputCurrency
                name="awarding_budget"
                label="Monto total de adjudicación"
            />
            <FormDatePicker name="awarding_date" label="Fecha de adjudicación" />
        </Fragment>
    );
};

export default ContractAwardingFormFields;
