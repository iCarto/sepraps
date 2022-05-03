import {useController, useFormContext} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const FormSelect = ({
    name: propsName,
    label,
    options,
    rules = {},
    onChangeHandler = null,
    showEmptyOption = false,
    disabled = false,
}) => {
    const {control} = useFormContext();
    const {
        field: {onChange, name, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules,
    });

    const emptyOption = {
        value: "",
        label: "‌‌", // This is not an empty character. It's U+200C unicode character.
    };

    return (
        <FormControl fullWidth error={Boolean(error)} margin="normal">
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-label`}
                name={name}
                inputRef={ref}
                value={value}
                label={label}
                onChange={event => {
                    onChange(event);
                    if (onChangeHandler) {
                        onChangeHandler(event.target.value);
                    }
                }}
                disabled={disabled}
            >
                {(showEmptyOption ? [emptyOption, ...options] : options).map(
                    ({label, value}) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    )
                )}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};

export default FormSelect;
