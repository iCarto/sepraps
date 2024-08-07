import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {NumberUtil} from "base/format/utilities";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Stack from "@mui/material/Stack";
import {NumberHelperDialogWidget} from "base/shared/components";

const WAIT_INTERVAL = 500;
let timerID;

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
    showCalculator = false,
    calculatorOptions = [],
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

    const [value, setValue] = useState(NumberUtil.formatInteger(field.value));

    const inputLabel = rules && rules["required"] ? `${label} *` : label;

    const handleBlur = event => {
        trigger(propsName);
        field.onBlur();
        if (onBlurHandler) {
            onBlurHandler(event);
        }
    };

    const handleFocus = event => {
        trigger(propsName);
        if (onFocusHandler) {
            onFocusHandler(event);
        }
    };

    const handleChange = event => {
        const formValue = NumberUtil.cleanInteger(event.target.value);
        const formattedValue = NumberUtil.formatInteger(formValue);

        const cursorPosition = event.target.selectionStart;
        // Offset caused by thousand separator in formatted value
        const cursorOffset = formattedValue.length - event.target.value.length;

        const element = event.target;

        setValue(formattedValue); // UI state

        // Control cursor position after rerender caused by value state update
        window.requestAnimationFrame(() => {
            element.selectionStart = cursorPosition + cursorOffset;
            element.selectionEnd = cursorPosition + cursorOffset;
        });

        debounceFieldChange(formValue);
    };

    const debounceFieldChange = value => {
        clearTimeout(timerID);

        timerID = setTimeout(() => {
            field.onChange(parseInt(value)); // Data sent back to hook form
        }, WAIT_INTERVAL);
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

    const handleChangeCalculator = value => {
        const formattedValue = NumberUtil.formatInteger(value);
        setValue(formattedValue);
        debounceFieldChange(value);
    };

    if (showCalculator) {
        inputProps = {
            ...inputProps,
            endAdornment: (
                <Stack direction="row" alignItems="center">
                    {inputProps.endAdornment}
                    <InputAdornment position="end">
                        <NumberHelperDialogWidget
                            onSelectNumber={handleChangeCalculator}
                            calculatorOptions={calculatorOptions}
                        />
                    </InputAdornment>
                </Stack>
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
            onChange={handleChange}
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
