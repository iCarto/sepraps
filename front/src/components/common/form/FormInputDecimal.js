import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {NumberUtil} from "utilities";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const FormInputDecimal = ({
    name: propsName,
    label,
    endAdornment = null,
    rules = {},
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
            // TODO review this pattern for negativa numbers
            pattern: {
                //TODO: This function should use i18n pattern to validate decimal numbers
                value: /^\d+\,?\d{0,2}$/,
                message: "Formato incorrecto",
            },
        },
    });

    let inputProps = {};
    if (endAdornment) {
        inputProps = {
            ...inputProps,
            endAdornment: (
                <InputAdornment position="start">{endAdornment}</InputAdornment>
            ),
        };
    }

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = event => {
        setFocused(false);
        trigger(propsName);
        onBlur();
    };

    return (
        <TextField
            onChange={onChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={focused ? value : NumberUtil.formatCurrency(value, false)}
            name={name}
            inputRef={ref}
            label={label}
            margin="normal"
            fullWidth
            error={Boolean(error)}
            helperText={error?.message}
            InputProps={inputProps}
            disabled={disabled}
        />
    );
};

export default FormInputDecimal;
