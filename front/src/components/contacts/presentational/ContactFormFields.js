import {Fragment} from "react";
import {useDomain} from "components/common/provider";
import {FormCheckbox, FormInputText, FormSelect} from "components/common/form";

const ContactFormFields = ({
    allowedPosts = null,
    isMonitoringProfile = false,
    showIsStaff = false,
}) => {
    const {contactPosts} = useDomain();

    // TODO post.value is a dependency with a back-end domain value
    // We should remove this dependency in the future
    const posts = allowedPosts
        ? contactPosts.filter(post => allowedPosts.includes(post.value))
        : [...contactPosts];

    return (
        <Fragment>
            <FormInputText name="contact_name" label="Nombre del contacto" />
            {!isMonitoringProfile && (
                <FormSelect name="contact_post" label="Cargo" options={posts} />
            )}
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
            {showIsStaff && (
                <FormCheckbox name="contact_staff" label="Personal interno" />
            )}
        </Fragment>
    );
};

export default ContactFormFields;
