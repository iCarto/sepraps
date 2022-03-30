import {useState} from "react";

import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const departments = ["Itapúa", "Asunción", "Alto Paraná", "Central"];

function getStyles(department, deptName, theme) {
    return {
        fontWeight:
            deptName.indexOf(department) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const FormSelectMultipleChip = () => {
    const theme = useTheme();
    const [deptName, setDeptName] = useState([]);

    const handleChange = event => {
        const {
            target: {value},
        } = event;
        setDeptName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="multiple-chip-label">Filtrar por departamento</InputLabel>
            <Select
                labelId="multiple-chip-label"
                id="multiple-chip"
                multiple
                value={deptName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Departamento" />}
                renderValue={selected => (
                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                        {selected.map(value => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {departments.map(department => (
                    <MenuItem
                        key={department}
                        value={department}
                        style={getStyles(department, deptName, theme)}
                    >
                        {department}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FormSelectMultipleChip;
