import {Fragment} from "react";
import {useDomain} from "components/common/provider";
import {FormInputText, FormSelect} from "components/common/form";

const ContactFormFields = () => {
    const {contactPosts} = useDomain();

    return (
        <Fragment>
            <FormInputText name="contact_name" label="Nombre del contacto" />
            <FormSelect name="contact_post" label="Cargo" options={contactPosts} />
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
        </Fragment>
    );
};

export default ContactFormFields;
