import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormTextArea = ({
    name: propsName,
    placeholder = "",
    label,
    isActive = true,
    maxLength = 4000,
    rules = {},
    rows = 3,
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

    const inputLabel = rules && rules["required"] ? `${label} *` : label;

    return (
        <TextField
            fullWidth
            multiline
            rows={rows}
            disabled={!isActive}
            name={name}
            label={inputLabel}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={Boolean(error)}
            helperText={error?.message}
            inputProps={{maxLength: maxLength}}
            InputLabelProps={{shrink: true}}
            sx={{backgroundColor: "white"}}
        />
    );
};

export default FormTextArea;
