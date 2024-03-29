import {useDomain} from "sepraps/domain/provider";
import {
    FormCheckbox,
    FormInputInteger,
    FormInputText,
    FormSelect,
    FormTextArea,
} from "base/form/components";

const ContactFormFields = ({
    allowedPosts = null,
    showPostField = false,
    showIsStaff = false,
}) => {
    const {contactPosts, genderDomain} = useDomain();

    // TODO post.value is a dependency with a back-end domain value
    // We should remove this dependency in the future
    const posts = allowedPosts
        ? contactPosts.filter(post => allowedPosts.includes(post.value))
        : [...contactPosts];

    return (
        <>
            <FormInputText
                name="name"
                label="Nombre del contacto"
                rules={{required: "El campo es obligatorio"}}
            />
            {!showPostField && (
                <FormSelect
                    name="post"
                    label="Cargo"
                    options={posts}
                    rules={{required: "El campo es obligatorio"}}
                />
            )}
            <FormSelect
                name="gender"
                label="Género"
                options={genderDomain}
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputInteger name="ci_number" label="Nº CI" />
            <FormInputText name="phone" label="Celular" />
            <FormInputText name="email" label="E-mail" />
            <FormTextArea name="comments" label="Observaciones" />
            {showIsStaff && <FormCheckbox name="is_staff" label="Personal interno" />}
        </>
    );
};

export default ContactFormFields;
