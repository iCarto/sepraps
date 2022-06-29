import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormTextArea = ({
    name: propsName,
    label,
    rules = {},
    isActive = true,
    margin = "normal",
}) => {
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
            fullWidth
            multiline
            margin={margin}
            rows={3}
            disabled={!isActive}
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={Boolean(error)}
            helperText={error?.message}
        />
    );
};

export default FormTextArea;
