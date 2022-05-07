import {Fragment} from "react";
import {FormFinancingProgramAutocomplete} from "components/financingprogram";

const ContractFinancingFormFields = () => {
    return (
        <Fragment>
            <FormFinancingProgramAutocomplete
                name="financing_program"
                label="Programa de financiación"
            />
        </Fragment>
    );
};

export default ContractFinancingFormFields;
