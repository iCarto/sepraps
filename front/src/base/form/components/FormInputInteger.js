import {useState, forwardRef} from "react";
import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";

const allowOnlyNumber = value => {
    return value.replace(/[^0-9]/g, "");
};

const FormInputInteger = (
    {
        name: propsName,
        label,
        onFocusHandler = null,
        onBlurHandler = null,
        tooltipText = "",
        endAdornment = null,
        placeholder = null,
        maxLength = null,
        small = false,
        disabled = false,
        rules = {},
    },
    ref
) => {
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

    let inputProps = {};
    if (endAdornment || tooltipText) {
        inputProps = {
            ...inputProps,
            endAdornment: (
                <>
                    {endAdornment && (
                        <InputAdornment position="start">{endAdornment}</InputAdornment>
                    )}
                </>
            ),
        };
    }

    const getLabel = () => {
        return tooltipText ? (
            <Box display="flex" alignItems="center" marginRight="-8px">
                {label}
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
            label
        );
    };

    return (
        <TextField
            ref={ref}
            fullWidth
            onChange={event => {
                const userValue = allowOnlyNumber(event.target.value);
                field.onChange(parseInt(userValue)); // data send back to hook form
                setValue(userValue); // UI state
            }}
            size={small ? "small" : "normal"}
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={value}
            name={field.name}
            inputRef={field.ref}
            label={getLabel()}
            disabled={disabled}
            error={Boolean(error)}
            helperText={error?.message}
            InputLabelProps={{shrink: true}}
            InputProps={inputProps}
            inputProps={{maxLength: maxLength}}
            placeholder={placeholder}
            sx={{padding: "0px"}}
        />
    );
};

export default forwardRef(FormInputInteger);
