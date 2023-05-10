import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";

import {DECIMAL_SEPARATOR} from "base/format/config/i18n";
import {NumberUtil} from "base/format/utilities";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const getDecimalSize = value => {
    if (value.includes(DECIMAL_SEPARATOR)) {
        return value.split(DECIMAL_SEPARATOR)[1].length;
    }
    return 0;
};

const FormInputDecimal = ({
    name: propsName,
    label,
    tooltipText = "",
    placeholder = null,
    endAdornment = null,
    decimalSize = 2,
    rules = {},
    disabled = false,
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
        },
    });
    const [value, setValue] = useState(
        NumberUtil.formatDecimal(field.value, decimalSize)
    );

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

    const handleBlur = event => {
        trigger(propsName);
        field.onBlur();
    };

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
            fullWidth
            name={field.name}
            value={value}
            onChange={event => {
                const userValue = NumberUtil.cleanDecimal(event.target.value);
                if (getDecimalSize(userValue) <= decimalSize) {
                    field.onChange(NumberUtil.parseDecimal(userValue)); // data sent back to hook form
                    setValue(userValue); // UI state
                }
            }}
            onBlur={handleBlur}
            inputRef={field.ref}
            label={getLabel()}
            placeholder={placeholder}
            helperText={error?.message}
            InputLabelProps={{shrink: true}}
            InputProps={inputProps}
            error={Boolean(error)}
            disabled={disabled}
        />
    );
};

export default FormInputDecimal;
