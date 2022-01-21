import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormInputInteger = ({name: propsName, label, rules = {}}) => {
    const {control} = useFormContext();

    const validate = value => {
        const matches = value.match(/^\d+$/);
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

export default FormInputInteger;
