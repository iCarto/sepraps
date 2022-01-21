import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormInputText = ({name: propsName, label, rules = {}}) => {
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

export default FormInputText;
