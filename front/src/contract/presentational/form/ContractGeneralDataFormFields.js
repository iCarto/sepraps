import {FormInputText, FormSelectMultiple, FormTextArea} from "base/form/components";
import {FormFinancingProgramAutocomplete} from "financing/presentational";
import {useDomain} from "sepraps/domain/provider";

const ContractGeneralDataFormFields = () => {
    const {serviceTypes} = useDomain();

    return (
        <>
            <FormInputText
                name="contract_number"
                label="Número de contrato"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormTextArea name="comments" label="Descripción" />
            <FormSelectMultiple
                name="services"
                label="Servicios"
                options={serviceTypes}
            />
            <FormFinancingProgramAutocomplete
                name="financing_program"
                label="Programa de financiación"
            />
        </>
    );
};

export default ContractGeneralDataFormFields;
