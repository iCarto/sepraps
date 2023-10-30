import {FormInputText, FormTextArea} from "base/form/components";
import {FormFinancingProgramAutocomplete} from "financing/presentational";

const ContractGeneralDataFormFields = () => {
    return (
        <>
            <FormInputText
                name="contract_number"
                label="Número de contrato"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormTextArea name="comments" label="Descripción" />
            <FormFinancingProgramAutocomplete
                name="financing_program"
                label="Programa de financiación"
            />
        </>
    );
};

export default ContractGeneralDataFormFields;
