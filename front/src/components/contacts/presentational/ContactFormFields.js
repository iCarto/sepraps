import {Fragment} from "react";
import {useDomain} from "components/common/provider";
import {
    FormCheckbox,
    FormInputText,
    FormSelect,
    FormTextArea,
} from "components/common/form";

const ContactFormFields = ({
    allowedPosts = null,
    showPostField = false,
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
            <FormInputText name="name" label="Nombre del contacto" />
            {!showPostField && <FormSelect name="post" label="Cargo" options={posts} />}
            <FormSelect
                name="gender"
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
            <FormInputText name="phone" label="Celular" />
            <FormInputText name="email" label="Correo electrónico" />
            <FormTextArea name="comments" label="Observaciones" />
            {showIsStaff && <FormCheckbox name="is_staff" label="Personal interno" />}
        </Fragment>
    );
};

export default ContactFormFields;
