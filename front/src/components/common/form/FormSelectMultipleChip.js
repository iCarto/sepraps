import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";

import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

const item_height = 48;
const item_padding_top = 8;
const menuprops = {
    PaperProps: {
        style: {
            maxHeight: item_height * 4.5 + item_padding_top,
            width: 250,
        },
    },
};

const getStyles = (option, optionName, theme) => {
    return {
        fontWeight:
            [optionName].indexOf(option) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};

const FormSelectMultipleChip = ({
    name: propsName,
    label = "",
    options,
    onChangeHandler = null,
}) => {
    const {control} = useFormContext();
    const {
        field: {onChange, name, value, ref},
    } = useController({
        name: propsName,
        control,
    });

    const [optionCodes, setOptionCodes] = useState([]);
    const theme = useTheme();

    options?.map(option => option.value.toString());

    const getOptionLabels = optionValues => {
        if (optionValues.length !== 0) {
            return optionValues
                .map(
                    optionValue =>
                        options?.find(option => option.value == optionValue)?.label
                )
                .join(", ");
        }
        return "";
    };

    // const handleChange = event => {
    //     const optionValue = event.target.value.toString();
    //     optionValue.length !== 0 ? (isFilterActive = true) : (isFilterActive = false);

    //     setOptionCodes(
    //         // On autofill we get a stringified value.
    //         typeof optionValue === "string" ? optionValue.split(",") : optionValue
    //     );
    //     onFilter(optionValue, name);
    // };

    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-label`}
                id={`${name}-select`}
                // multiple
                inputRef={ref}
                value={[value]}
                onChange={event => {
                    onChange(event);
                    if (onChangeHandler) {
                        onChangeHandler(event.target.value);
                    }
                }}
                input={
                    <OutlinedInput
                        id={`${name}-input`}
                        label={label}
                        endAdornment={
                            value !== "" && (
                                <InputAdornment position="end" sx={{mr: 3}}>
                                    <IconButton
                                        aria-label="clear filter"
                                        edge="end"
                                        onClick={event => {
                                            onChange((event.target.value = ""));
                                            if (onChangeHandler) {
                                                onChangeHandler(
                                                    (event.target.value = "")
                                                );
                                            }
                                        }}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    />
                }
                renderValue={selected => (
                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                        {selected.map(
                            value =>
                                value !== "" && (
                                    <Chip
                                        key={value}
                                        label={getOptionLabels(selected)}
                                    />
                                )
                        )}
                    </Box>
                )}
                menuprops={menuprops}
            >
                {options?.map(option => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        style={getStyles(option, optionCodes, theme)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FormSelectMultipleChip;
