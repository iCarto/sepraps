import {Fragment} from "react";
import {useDomain} from "components/common/provider";
import {FormInputText, FormSelect, FormLocationSelect} from "components/common/form";

const ProviderFormFields = () => {
    const {areas} = useDomain();

    console.log("ProviderFormFields");

    return (
        <Fragment>
            <FormInputText name="provider_name" label="Nombre del prestador" />
            <FormSelect
                name="provider_area"
                label="Área del prestador"
                options={areas}
            />
            <FormLocationSelect name="provider_location" />
        </Fragment>
    );
};

export default ProviderFormFields;
