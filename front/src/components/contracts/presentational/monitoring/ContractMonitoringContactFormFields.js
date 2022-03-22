import {Fragment} from "react";
import {FormCheckbox, FormInputText, FormSelect} from "components/common/form";

const ContractMonitoringContactFormFields = () => {
    return (
        <Fragment>
            <FormInputText name="contact_name" label="Nombre del contacto" />
            <FormSelect
                name="contact_gender"
                label="Género"
                options={[
                    {
                        value: "M",
                        label: "Hombre",
                    },
                    {
                        value: "F",
                        label: "Mujer",
                    },
                ]}
            />
            <FormInputText name="contact_phone" label="Celular" />
            <FormInputText name="contact_email" label="Correo electrónico" />
            <FormInputText name="contact_comments" label="Observaciones" />
            <FormCheckbox name="contact_staff" label="Personal interno" />
        </Fragment>
    );
};

export default ContractMonitoringContactFormFields;
