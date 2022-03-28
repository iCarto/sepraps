import {useState} from "react";

import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
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
            optionName.indexOf(option) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};

const FormSelectMultipleChip = ({
    name: propsName,
    label = "",
    options,
    onFilter = null,
}) => {
    const [optionNames, setOptionNames] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const theme = useTheme();

    const handleChange = event => {
        const optionValues = event.target.value;

        optionValues.length !== 0 ? setIsFilterActive(true) : setIsFilterActive(false);

        setOptionNames(
            // On autofill we get a stringified value.
            typeof optionValues === "string" ? optionValues.split(",") : optionValues
        );
        onFilter(optionValues);
    };

    const clearFilterValues = () => {
        setOptionNames([]);
        setIsFilterActive(false);
        onFilter("");
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="multiple-chip-label">{label}</InputLabel>
            <Select
                labelId="multiple-chip-label"
                id="multiple-chip-select"
                // multiple
                value={optionNames}
                onChange={handleChange}
                input={
                    <OutlinedInput
                        id="multiple-chip-input"
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
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                menuprops={menuprops}
            >
                {options?.map(option => (
                    <MenuItem
                        key={option.value}
                        name={option.label}
                        value={option.label}
                        style={getStyles(option, optionNames, theme)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FormSelectMultipleChip;
