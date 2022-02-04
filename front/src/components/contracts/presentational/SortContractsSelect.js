import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const SortContractsSelect = ({attribute, order, handleSortBy}) => {
    const handleInputChange = event => {
        const value = event.target.value;
        handleSortBy(value.split("-")[0], value.split("-")[1]);
    };

    const sortValue = attribute + "-" + order;

    return (
        <FormControl fullWidth>
            <InputLabel id="sortBy">Ordenar por</InputLabel>
            <Select
                labelId="sortBy"
                id="sortByDate"
                value={sortValue}
                name="sortBy"
                label="Ordenar"
                onChange={handleInputChange}
            >
                <MenuItem value="number-asc">Número - ascendente</MenuItem>
                <MenuItem value="number-desc">Número - descendente</MenuItem>

                <MenuItem value="init_date-asc">Fecha de inicio - ascendente</MenuItem>
                <MenuItem value="init_date-desc">
                    Fecha de inicio - descendente
                </MenuItem>

                <MenuItem value="updated_at-asc">
                    Fecha de modificación - ascendente
                </MenuItem>
                <MenuItem value="updated_at-desc">
                    Fecha de modificación - descendente
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default SortContractsSelect;
