import {useController, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";

const FormInputText = ({
    name: propsName,
    label,
    placeholder = null,
    endAdornment = null,
    tooltipText = "",
    maxLength = null,
    disabled = false,
    rules = {},
}) => {
    const {control} = useFormContext();

    const {
        field: {onChange, onBlur, name, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules,
    });

    const inputLabel = rules && rules["required"] ? `${label} *` : label;

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
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            label={getLabel()}
            placeholder={placeholder}
            helperText={error?.message}
            error={Boolean(error)}
            inputProps={{maxLength: maxLength}}
            InputProps={inputProps}
            InputLabelProps={{shrink: true}}
            fullWidth
            disabled={disabled}
        />
    );
};

export default FormInputText;
