import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {NumberUtil} from "base/format/utilities";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const FormInputInteger = ({
    name: propsName,
    label,
    onFocusHandler = null,
    onBlurHandler = null,
    tooltipText = "",
    endAdornment = null,
    placeholder = null,
    maxLength = null,
    disabled = false,
    rules = {},
}) => {
    const {control, trigger} = useFormContext();

    const {
        field,
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: {
            ...rules,
            // Format validation not needed because component only allows numbers
        },
    });

    const [value, setValue] = useState(field.value);

    const inputLabel = rules && rules["required"] ? `${label} *` : label;

    const handleBlur = event => {
        trigger(propsName);
        field.onBlur();
        if (onBlurHandler) {
            onBlurHandler(event);
        }

        const formattedValue = NumberUtil.formatInteger(value);
        setValue(formattedValue);
    };

    const handleFocus = event => {
        trigger(propsName);
        if (onFocusHandler) {
            onFocusHandler(event);
        }

        const unformattedValue = NumberUtil.cleanInteger(value);
        setValue(unformattedValue);
    };

    let inputProps = {};
    if (endAdornment || tooltipText) {
        inputProps = {
            ...inputProps,
            endAdornment: (
                <>
                    {endAdornment && (
                        <InputAdornment position="end">{endAdornment}</InputAdornment>
                    )}
                </>
            ),
        };
    }

    const getLabel = () => {
        return tooltipText ? (
            <Box display="flex" alignItems="center" marginRight="-8px">
                {inputLabel}
                {
                    <Tooltip title={tooltipText} arrow enterDelay={500}>
                        <InfoOutlinedIcon
                            fontSize="small"
                            sx={{mx: 1, color: "grey.500"}}
                        />
                    </Tooltip>
                }
            </Box>
        ) : (
            inputLabel
        );
    };

    return (
        <TextField
            fullWidth
            name={field.name}
            value={value}
            onChange={event => {
                const userValue = NumberUtil.cleanInteger(event.target.value);
                field.onChange(parseInt(userValue)); // data send back to hook form
                setValue(userValue); // UI state
            }}
            onBlur={handleBlur}
            onFocus={handleFocus}
            inputRef={field.ref}
            label={getLabel()}
            placeholder={placeholder}
            helperText={error?.message}
            InputLabelProps={{shrink: true}}
            InputProps={inputProps}
            inputProps={{maxLength: maxLength}}
            error={Boolean(error)}
            disabled={disabled}
        />
    );
};

export default FormInputInteger;
