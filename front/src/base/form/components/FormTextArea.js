import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormTextArea = ({name: propsName, label, rules = {}, isActive = true}) => {
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
            InputLabelProps={{shrink: true}}
        />
    );
};

export default FormTextArea;
