import {useDomain} from "components/common/provider";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProviderSearchAutocomplete = ({handleSelect}) => {
    const {providers} = useDomain();

    const handleChange = (event, newValue) => {
        handleSelect(newValue);
    };

    return (
        <Autocomplete
            id="project-provider-check-autocomplete"
            options={providers}
            onChange={handleChange}
            getOptionLabel={option => option.name}
            renderOption={(props, option, {selected}) => (
                <Box component="li" {...props} key={option.id}>
                    <Stack>
                        <Typography>{option.name}</Typography>
                        <Typography variant="caption" sx={{ml: 1}}>
                            ({option.locality_name} - {option.district_name} -{" "}
                            {option.department_name})
                        </Typography>
                    </Stack>
                </Box>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Prestador"
                    placeholder="Buscar un prestador"
                />
            )}
        />
    );
};

export default ProviderSearchAutocomplete;
