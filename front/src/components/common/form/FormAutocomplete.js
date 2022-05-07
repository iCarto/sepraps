import {useController, useFormContext} from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const FormAutocomplete = ({name: propsName, label, options, rules = {}}) => {
    const {control} = useFormContext();

    const {
        field: {onChange, onBlur, name, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules,
    });

    return (
        <Autocomplete
            id={`${propsName}-form-autocomplete`}
            onChange={(event, option) => {
                onChange(option);
            }}
            value={value}
            options={options}
            getOptionLabel={option => (option ? option.name : "")}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            fullWidth
            renderOption={(props, option, {selected}) => (
                <Box component="li" {...props} key={option.id}>
                    <Stack>
                        <Typography>{option.name}</Typography>
                    </Stack>
                </Box>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    inputRef={ref}
                    label={label}
                    placeholder="Elija un valor en la lista"
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default FormAutocomplete;
