import {useDomain} from "sepraps/domain/provider";
import {FormInputText, FormLocationSelect, FormSelect} from "base/form/components";

const ProviderFormGeneralDataFields = ({orientation = "row"}) => {
    const {areas} = useDomain();

    return (
        <>
            <FormInputText name="name" label="Nombre del prestador" />
            <FormSelect name="area" label="Área del prestador" options={areas} />
            <FormLocationSelect name="locality" orientation={orientation} />
        </>
    );
};

export default ProviderFormGeneralDataFields;
