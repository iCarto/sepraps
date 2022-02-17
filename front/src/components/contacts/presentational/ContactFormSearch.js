import {useState} from "react";

import ContactSearchAutocomplete from "./ContactSearchAutocomplete";
import ContactSection from "./ContactSection";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ContactFormSearch = ({onSelect, onCancel}) => {
    const [existingContact, setExistingContact] = useState(null);

    const handleSelectExistingContact = contact => {
        setExistingContact(contact);
    };

    return (
        <Grid container spacing={2} sx={{mt: 0.25}}>
            <Grid item xs={12}>
                <ContactSearchAutocomplete handleSelect={handleSelectExistingContact} />
            </Grid>
            <Grid item xs={12}>
                {existingContact && <ContactSection contact={existingContact} />}
            </Grid>
            <Grid container justifyContent="center" sx={{mt: 2}}>
                <Grid>
                    <Button color="inherit" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ml: 2}}
                        onClick={() => {
                            onSelect(existingContact);
                        }}
                    >
                        Añadir
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ContactFormSearch;
