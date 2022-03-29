import {Fragment} from "react";
import {FormInputText} from "components/common/form";

const ContractGeneralDataFormFields = () => {
    return (
        <Fragment>
            <FormInputText
                name="contract_number"
                label="Número de contrato"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputText name="comments" label="Observaciones" />
        </Fragment>
    );
};

export default ContractGeneralDataFormFields;
