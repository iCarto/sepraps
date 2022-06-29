import {useController, useFormContext} from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const FormAutocomplete = ({
    name: propsName,
    label,
    options,
    optionIdAttribute = "id",
    optionLabelAttribute = "name",
    rules = {},
    onChangeHandler = null,
}) => {
    const {control} = useFormContext();

    const {
        field: {onChange, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules,
    });

    return (
        <Autocomplete
            fullWidth
            id={`${propsName}-form-autocomplete`}
            NoOptionsText={"No hay opciones disponibles"}
            onChange={(event, option) => {
                onChange(option);
                event.preventDefault();
                if (onChangeHandler) {
                    onChangeHandler(option);
                }
            }}
            value={value}
            options={options}
            getOptionLabel={option =>
                option && option[optionLabelAttribute]
                    ? option[optionLabelAttribute]
                    : ""
            }
            isOptionEqualToValue={(option, value) =>
                value &&
                value !== "" &&
                option[optionIdAttribute] === value[optionIdAttribute]
            }
            renderOption={(props, option, {selected}) => (
                <Box component="li" {...props} key={option[optionIdAttribute]}>
                    <Stack>
                        <Typography>{option[optionLabelAttribute]}</Typography>
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
