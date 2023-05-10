import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {FormDatePicker, FormInputInteger} from "base/form/components";

const ContractAwardingFormFields = () => {
    return (
        <>
            <FormDatePicker name="awarding_date" label="Fecha de adjudicación" />
            <FormInputInteger
                name="awarding_budget"
                label="Monto total de adjudicación"
                endAdornment={CURRENCY_SYMBOL}
            />
        </>
    );
};

export default ContractAwardingFormFields;
