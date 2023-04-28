import {ContactService} from "contact/service";
import {SearchAutocomplete} from "base/search/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ContactSearchAutocomplete = ({allowedPosts = null, handleSelect}) => {
    const optionComponent = option => {
        return (
            <Stack>
                <Typography>{option.name}</Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    {option.post_name}
                </Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    {option.phone} - {option.email}
                </Typography>
            </Stack>
        );
    };

    const searchContacts = textValue => {
        return ContactService.findContacts(textValue, allowedPosts);
    };

    return (
        <SearchAutocomplete
            label="Buscar un contacto"
            optionLabel="name"
            optionComponent={optionComponent}
            search={searchContacts}
            handleSelect={handleSelect}
        />
    );
};

export default ContactSearchAutocomplete;
