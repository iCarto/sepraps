import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormInputInteger = ({name: propsName, label, rules = {}}) => {
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

export default FormInputInteger;
