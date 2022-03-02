import {Fragment} from "react";
import {FormDatePicker, FormInputDecimal} from "components/common/form";

const ContractAwardingFormFields = () => {
    return (
        <Fragment>
            <FormInputDecimal
                name="awarding_budget"
                label="Monto total de adjudicación"
                endAdornment="$"
            />
            <FormInputDecimal
                name="awarding_percentage_drop"
                label="Porcentaje de baja"
                endAdornment="%"
            />
            <FormDatePicker name="awarding_date" label="Fecha de adjudicación" />
        </Fragment>
    );
};

export default ContractAwardingFormFields;
