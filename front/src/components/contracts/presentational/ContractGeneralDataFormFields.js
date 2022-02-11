import {Fragment} from "react";
import {FormInputText} from "components/common/form";

const ContractGeneralDataFormFields = () => {
    return (
        <Fragment>
            <FormInputText name="number" label="Número de contrato" />
            <FormInputText name="comments" label="Observaciones" />
        </Fragment>
    );
};

export default ContractGeneralDataFormFields;
