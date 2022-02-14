import {useDomain} from "components/common/provider";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ContractorSearchAutocomplete = ({handleSelect}) => {
    const {contractors} = useDomain();

    const handleChange = (event, newValue) => {
        handleSelect(newValue);
    };

    return (
        <Autocomplete
            id="contractor-check-autocomplete"
            options={contractors}
            onChange={handleChange}
            getOptionLabel={option => option.name}
            renderOption={(props, option, {selected}) => (
                <Box component="li" {...props} key={option.id}>
                    <Stack>
                        <Typography>{option.name}</Typography>
                        <Typography variant="caption" sx={{ml: 1}}>
                            ({option.phone} - {option.email})
                        </Typography>
                    </Stack>
                </Box>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Contratista"
                    placeholder="Buscar un contratista"
                />
            )}
        />
    );
};

export default ContractorSearchAutocomplete;
