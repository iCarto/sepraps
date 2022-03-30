import {useState} from "react";

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
    name,
    label = "",
    options,
    onFilter = null,
    onClear = null,
}) => {
    const [optionCodes, setOptionCodes] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const theme = useTheme();

    options?.map(option => option.value.toString());

    const getOptionLabels = optionValues => {
        if (optionValues) {
            return optionValues
                .map(
                    optionValue =>
                        options.find(option => option.value == optionValue).label
                )
                .join(", ");
        }
        return "";
    };

    const handleChange = event => {
        const optionValue = event.target.value.toString();
        optionValue.length !== 0 ? setIsFilterActive(true) : setIsFilterActive(false);

        setOptionCodes(
            // On autofill we get a stringified value.
            typeof optionValue === "string" ? optionValue.split(",") : optionValue
        );
        console.log({optionValue});
        onFilter(optionValue, name);
    };

    const clearFilterValues = () => {
        setOptionCodes([]);
        setIsFilterActive(false);
        // ------> TO-DO Remove filterItem from filterItems array
        onFilter([]);
        onClear(name);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-label`}
                id={`${name}-select`}
                // multiple
                value={optionCodes}
                onChange={handleChange}
                input={
                    <OutlinedInput
                        id={`${name}-input`}
                        label={label}
                        endAdornment={
                            <InputAdornment position="end" sx={{mr: 3}}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={clearFilterValues}
                                >
                                    {isFilterActive && <ClearIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                }
                renderValue={selected => (
                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                        {selected.map(value => (
                            <Chip key={value} label={getOptionLabels(selected)} />
                        ))}
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
