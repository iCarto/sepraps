import {Fragment} from "react";
import {FormDatePicker, FormInputCurrency} from "components/common/form";

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
