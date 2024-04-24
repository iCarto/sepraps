import {useEffect, useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const FormComboBox = ({
    name: propsName,
    label,
    options,
    handleSelect = null,
    placeholder = null,
    disabled = false,
    rules = {},
}) => {
    const {control} = useFormContext();

    const {
        field,
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules,
    });

    const [value, setValue] = useState(field.value);
    const [resetKey, setResetKey] = useState(0);

    const inputLabel = rules && rules["required"] ? `${label} *` : label;

    useEffect(() => {
        setResetKey(prevKey => prevKey + 1); // Force re-render in order to clear value when options change
        field.onChange(null);
    }, [options]);

    return (
        <Autocomplete
            fullWidth
            disablePortal
            key={resetKey}
            id={`${propsName}-combo-search-box`}
            options={options}
            onChange={(event, option) => {
                const userValue = option?.id;
                field.onChange(userValue);
                setValue(userValue);
                event.preventDefault();
                if (handleSelect) {
                    handleSelect(option);
                }
            }}
            isOptionEqualToValue={(option, value) => {
                return value && value !== "" && option.id === value.id;
            }}
            renderInput={params => (
                <TextField
                    value={value}
                    name={field.name}
                    label={inputLabel}
                    placeholder={placeholder}
                    error={Boolean(error)}
                    helperText={error?.message}
                    disabled={disabled}
                    {...params}
                    InputLabelProps={{shrink: true}}
                />
            )}
            noOptionsText={"No hay opciones disponibles"}
        />
    );
};

export default FormComboBox;
