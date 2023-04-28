import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {NumberUtil} from "base/format/utilities";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

//TO-DO: Adapt as per FormInputDecimal
const FormInputCurrency = ({name: propsName, label, rules = {}, disabled = false}) => {
    const {control, trigger} = useFormContext();

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
                value: /^[0-9]+$/,
                message: "Formato incorrecto",
            },
        },
    });

    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
        trigger(propsName);
        onBlur();
    };

    let inputProps = {
        endAdornment: <InputAdornment position="end">Gs.</InputAdornment>,
    };

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
            margin="normal"
            error={Boolean(error)}
            helperText={error?.message}
            InputProps={inputProps}
            disabled={disabled}
        />
    );
};

export default FormInputCurrency;
