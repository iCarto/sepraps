import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const SortProjectsSelect = ({attribute, order, handleSortBy}) => {
    const handleInputChange = event => {
        const value = event.target.value;
        handleSortBy(value.split("-")[0], value.split("-")[1]);
    };

    const sortValue = attribute + "-" + order;

    return (
        <Grid item xs={6} md={4} component="form">
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
                    <MenuItem value="name-asc">Nombre - ascendente</MenuItem>
                    <MenuItem value="name-desc">Nombre - descendente</MenuItem>

                    <MenuItem value="init_date-asc">
                        Fecha de inicio - ascendente
                    </MenuItem>
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
        </Grid>
    );
};

SortProjectsSelect.propTypes = {
    handleSortBy: PropTypes.func.isRequired,
    listToSort: PropTypes.array,
};

export default SortProjectsSelect;
