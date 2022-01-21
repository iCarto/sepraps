import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormInputDecimal = ({name: propsName, label, rules = {}}) => {
    const {control} = useFormContext();

    //TODO: This function should use i18n pattern to validate decimal numbers
    const validate = value => {
        const matches = value.match(
            /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:,\d{1,2})?)(?:e[+-]?\d+)?$/
        );
        return (
            matches?.length > 0 || "El valor del campo no cumple el formato correcto"
        );
    };

    const {
        field: {onChange, onBlur, name, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: {...rules, validate},
    });

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
        />
    );
};

export default FormInputDecimal;
