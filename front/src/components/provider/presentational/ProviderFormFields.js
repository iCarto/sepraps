import {Fragment} from "react";
import {useDomain} from "components/common/provider";
import {FormInputText, FormSelect, FormLocationSelect} from "components/common/form";

const ProviderFormFields = () => {
    const {areas} = useDomain();

    return (
        <Fragment>
            <FormInputText name="name" label="Nombre del prestador" />
            <FormSelect name="area" label="Área del prestador" options={areas} />
            <FormLocationSelect name="locality" />
        </Fragment>
    );
};

export default ProviderFormFields;
