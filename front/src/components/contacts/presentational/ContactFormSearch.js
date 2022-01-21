import {useState} from "react";

import ContactSearchAutocomplete from "./ContactSearchAutocomplete";
import ContactSection from "./ContactSection";

import Grid from "@mui/material/Grid";

const ContactFormSearch = ({handleSelect}) => {
    const [existingContact, setExistingContact] = useState(null);

    const handleSelectExistingContact = contact => {
        setExistingContact(contact);
        if (contact) {
            handleSelect(contact);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ContactSearchAutocomplete handleSelect={handleSelectExistingContact} />
            </Grid>
            <Grid item xs={12}>
                {existingContact && <ContactSection contact={existingContact} />}
            </Grid>
        </Grid>
    );
};

export default ContactFormSearch;
