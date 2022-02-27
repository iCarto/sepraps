import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const FormInputDecimal = ({
    name: propsName,
    label,
    endAdornment = null,
    rules = {},
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
            // TODO review this pattern for negativa numbers
            /*pattern: {
                //TODO: This function should use i18n pattern to validate decimal numbers
                value: /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:,\d{1,2})?)(?:e[+-]?\d+)?$/,
                message: "El valor del campo no cumple el formato correcto",
            },*/
        },
    });

    let inputProps = {};
    if (endAdornment) {
        inputProps = {
            ...inputProps,
            endAdornment: <InputAdornment position="start">{"$"}</InputAdornment>,
        };
    }

    return (
        <TextField
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            inputRef={ref}
            label={label}
            margin="normal"
            fullWidth
            error={Boolean(error)}
            helperText={error?.message}
            InputProps={inputProps}
        />
    );
};

export default FormInputDecimal;
