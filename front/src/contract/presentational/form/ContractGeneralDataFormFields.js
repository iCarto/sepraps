import {FormInputText, FormTextArea} from "base/form/components";

const ContractGeneralDataFormFields = () => {
    return (
        <>
            <FormInputText
                name="contract_number"
                label="Número de contrato"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormTextArea name="comments" label="Descripción" />
        </>
    );
};

export default ContractGeneralDataFormFields;
