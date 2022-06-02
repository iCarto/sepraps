import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const FormInputInteger = ({
    name: propsName,
    label,
    endAdornment = null,
    rules = {},
    onBlurHandler = null,
    disabled = false,
}) => {
    const {control} = useFormContext();

    const {
        field: {onChange, onBlur, name, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: {
            ...rules,
            pattern: {
                //TODO: This function should use i18n pattern to validate decimal numbers
                value: /^\d+$/,
                message: "El valor del campo no cumple el formato correcto",
            },
        },
    });

    let inputProps = {};
    if (endAdornment) {
        inputProps = {
            ...inputProps,
            endAdornment: (
                <InputAdornment position="start">{endAdornment}</InputAdornment>
            ),
        };
    }

    return (
        <TextField
            fullWidth
            onChange={onChange}
            onBlur={event => {
                onBlur();
                if (onBlurHandler) {
                    onBlurHandler(event);
                }
            }}
            value={value}
            name={name}
            inputRef={ref}
            label={label}
            disabled={disabled}
            margin="normal"
            error={Boolean(error)}
            helperText={error?.message}
            InputProps={inputProps}
        />
    );
};

export default FormInputInteger;
