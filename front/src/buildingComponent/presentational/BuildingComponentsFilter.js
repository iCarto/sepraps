import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const BC_DATA_FILTER = {
    GROUPED_BY: {
        COMPONENT: {
            code: "component_code",
            label: "Componente de construcción",
        },
        UNGROUPED: {
            code: "ungrouped",
            label: "Sin agrupar",
        },
    },
};

const BuildingComponentsFilter = ({groupedBy, onChangeGroupedBy}) => {
    const handleChangeTrainingDataGroupedBy = event => {
        onChangeGroupedBy(event.target.value);
    };

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="chart-data-type-select-label">
                        Agrupado por
                    </InputLabel>
                    <Select
                        labelId="chart-group-select-label"
                        id="chart-group-select"
                        value={groupedBy}
                        label="Agrupado por"
                        onChange={handleChangeTrainingDataGroupedBy}
                    >
                        {Object.values(BC_DATA_FILTER.GROUPED_BY).map(groupedBy => (
                            <MenuItem key={groupedBy.code} value={groupedBy.code}>
                                {groupedBy.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export {BuildingComponentsFilter as default, BC_DATA_FILTER};
