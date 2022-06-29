import {Fragment} from "react";
import {useDomain} from "components/common/provider";
import {FormInputText, FormSelect, FormTextArea} from "components/common/form";

const ContractorFormFields = () => {
    const {contractorTypes} = useDomain();

    return (
        <Fragment>
            <FormInputText name="name" label="Nombre del contratista" />
            <FormSelect
                name="contractor_type"
                label="Tipo de contratista"
                options={contractorTypes}
            />
            <FormInputText name="address" label="Dirección" />
            <FormInputText name="phone" label="Celular" />
            <FormInputText name="email" label="E-mail" />
            <FormTextArea name="comments" label="Observaciones" />
        </Fragment>
    );
};

export default ContractorFormFields;
