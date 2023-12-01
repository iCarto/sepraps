import {useState} from "react";
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
    multiple = false,
    disabled = false,
    margin = "dense",
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

    const placeholderValue = "placeholder";
    const valueIsSet = field.value || field.value === false;

    const [value, setValue] = useState(valueIsSet ? field.value : placeholderValue);

    const inputLabel = rules && rules["required"] ? `${label} *` : label;

    const emptyOption = {
        value: "",
        label: "‌‌", // This is not an empty character. It's U+200C unicode character.
    };

    const styleForPlaceholder =
        value === placeholderValue
            ? {
                  "div:first-of-type": {opacity: 0.15, fontStyle: "italic"},
              }
            : {};

    return (
        <FormControl fullWidth error={Boolean(error)} margin={margin}>
            <InputLabel id={`${field.name}-label`} shrink>
                {inputLabel}
            </InputLabel>
            <Select
                labelId={`${field.name}-label`}
                name={field.name}
                inputRef={field.ref}
                value={value}
                label={inputLabel}
                sx={{...styleForPlaceholder, backgroundColor: "white"}}
                onChange={event => {
                    event.preventDefault();
                    setValue(event.target.value);
                    field.onChange(event);
                    if (onChangeHandler) {
                        onChangeHandler(event.target.value);
                    }
                }}
                disabled={disabled}
                multiple={multiple}
                notched
            >
                {value === placeholderValue && !showEmptyOption ? (
                    <MenuItem
                        value={placeholderValue}
                        sx={{
                            fontStyle: "italic",
                        }}
                        disabled
                    >
                        {options
                            ? "Seleccione una opción de la lista"
                            : "No hay opciones disponibles"}
                    </MenuItem>
                ) : null}
                {(showEmptyOption ? [emptyOption, ...options] : options)?.map(
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
