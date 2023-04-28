import {Fragment} from "react";
import {FormFinancingProgramAutocomplete} from "financing/presentational";

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
