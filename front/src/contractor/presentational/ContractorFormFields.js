import {useDomain} from "sepraps/domain/provider";
import {FormInputText, FormSelect, FormTextArea} from "base/form/components";

const ContractorFormFields = () => {
    const {contractorTypes} = useDomain();

    return (
        <>
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
        </>
    );
};

export default ContractorFormFields;
