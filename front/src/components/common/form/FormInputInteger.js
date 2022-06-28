import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {NumberUtil} from "utilities";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const FormInputInteger = ({
    name: propsName,
    label,
    endAdornment = null,
    rules = {},
    onBlurHandler = null,
    disabled = false,
}) => {
    const {control, trigger} = useFormContext();
    const [focused, setFocused] = useState(false);

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
                message: "Formato incorrecto",
            },
        },
    });

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = event => {
        setFocused(false);
        trigger(propsName);
        onBlur();
        if (onBlurHandler) {
            onBlurHandler(event);
        }
    };

    let inputProps = {};
    if (endAdornment) {
        inputProps = {
            ...inputProps,
            endAdornment: (
                <InputAdornment position="start">{endAdornment}</InputAdornment>
            ),
        };
    }

    return (
        <TextField
            fullWidth
            onChange={onChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={focused ? value : NumberUtil.formatCurrency(value, false)}
            name={name}
            inputRef={ref}
            label={label}
            disabled={disabled}
            margin="normal"
            error={Boolean(error)}
            helperText={error?.message}
            InputProps={inputProps}
        />
    );
};

export default FormInputInteger;
