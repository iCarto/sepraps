import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

const FormCheckbox = ({
    name: propsName,
    label,
    rules = {},
    disabled = false,
    onChange = null,
    style = {},
    defaultChecked = false,
}) => {
    const {control} = useFormContext();

    const {
        field,
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: {
            ...rules,
        },
    });

    const [value, setValue] = useState(field.value);

    const handleChange = userValue => {
        onChange(userValue);
    };

    return (
        <FormControl error={Boolean(error)} margin="none">
            <FormControlLabel
                label={label}
                name={field.name}
                inputRef={field.ref}
                value={value}
                control={
                    <Checkbox
                        checked={defaultChecked || value}
                        onChange={event => {
                            const userValue = event.target.checked;
                            field.onChange(userValue); // data sent back to hook form
                            setValue(userValue); // UI state
                            if (onChange) {
                                handleChange(userValue);
                            }
                        }}
                        disabled={disabled}
                        sx={style}
                    />
                }
            />
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};

export default FormCheckbox;
