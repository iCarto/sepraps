import {ContactService} from "service/api";
import {SearchAutocomplete} from "components/common/presentational";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ContactSearchAutocomplete = ({handleSelect}) => {
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

    return (
        <SearchAutocomplete
            label="Buscar un contacto"
            optionLabel="name"
            optionComponent={optionComponent}
            search={ContactService.getContactsBySearchText}
            handleSelect={handleSelect}
        />
    );
};

export default ContactSearchAutocomplete;
