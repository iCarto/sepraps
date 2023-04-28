import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {NumberUtil} from "base/format/utilities";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";

const DECIMAL_SEPARATOR = ",";

const allowOnlyNumberAndSeparator = value => {
    let replaced = value.replace(
        new RegExp("[^\\d" + DECIMAL_SEPARATOR + "]", "g"),
        ""
    );
    if ((replaced.match(RegExp(DECIMAL_SEPARATOR, "g")) || []).length) {
        const lastIndex = replaced.lastIndexOf(DECIMAL_SEPARATOR);
        replaced = replaced.substring(0, lastIndex) + replaced.substring(lastIndex + 1);
    }
    return replaced;
};

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
                        <InputAdornment position="start">{endAdornment}</InputAdornment>
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
            onChange={event => {
                const userValue = allowOnlyNumberAndSeparator(event.target.value);
                if (getDecimalSize(userValue) <= decimalSize) {
                    field.onChange(NumberUtil.parseDecimal(userValue)); // data sent back to hook form
                    setValue(userValue); // UI state
                }
            }}
            onBlur={handleBlur}
            value={value}
            name={field.name}
            inputRef={field.ref}
            label={getLabel()}
            fullWidth
            error={Boolean(error)}
            helperText={error?.message}
            InputLabelProps={{shrink: true}}
            InputProps={inputProps}
            disabled={disabled}
            placeholder={placeholder}
        />
    );
};

export default FormInputDecimal;
