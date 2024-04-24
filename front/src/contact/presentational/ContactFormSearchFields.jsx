import {useState} from "react";

import {useDomain} from "sepraps/domain/provider";
import {FormSelect} from "base/form/components";
import ContactSearchAutocomplete from "./ContactSearchAutocomplete";
import ContactSection from "./ContactSection";

import Grid from "@mui/material/Grid";
import {useFormContext} from "react-hook-form";

const ContactFormSearchFields = ({allowedPosts = null}) => {
    const {contactPosts} = useDomain();
    const {reset, getValues} = useFormContext();

    const [existingContact, setExistingContact] = useState(null);

    // TODO post.value is a dependency with a back-end domain value
    // We should remove this dependency in the future
    const posts = allowedPosts
        ? contactPosts.filter(post => allowedPosts.includes(post.value))
        : [...contactPosts];

    const handleSelectExistingContact = contact => {
        setExistingContact(contact);
        const values = getValues();
        reset({
            ...values,
            contact_id: contact?.id || "",
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormSelect
                    name="post"
                    label="Cargo"
                    options={posts}
                    rules={{required: "El campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={12}>
                <ContactSearchAutocomplete
                    allowedPosts={[]}
                    handleSelect={handleSelectExistingContact}
                />
            </Grid>
            <Grid item xs={12}>
                {existingContact && <ContactSection contact={existingContact} />}
            </Grid>
        </Grid>
    );
};

export default ContactFormSearchFields;
