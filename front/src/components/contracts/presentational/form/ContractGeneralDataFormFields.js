import {Fragment} from "react";
import {FormInputText, FormTextArea} from "components/common/form";

const ContractGeneralDataFormFields = () => {
    return (
        <Fragment>
            <FormInputText
                name="contract_number"
                label="Número de contrato"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormTextArea name="comments" label="Descripción" />
        </Fragment>
    );
};

export default ContractGeneralDataFormFields;
