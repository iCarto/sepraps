import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const TRAINING_DATA_FILTER = {
    DATA_TYPE: {
        WOMEN_MEN: {
            code: "women_men",
            label: "Mujeres y varones",
        },
        WOMEN_PERCENTAGE: {
            code: "women_perc",
            label: "Mujeres (%)",
        },
        HOURS: {
            code: "hours",
            label: "Horas",
        },
    },
    GROUPED_BY: {
        COMPONENT: {
            code: "component_code",
            label: "Componente social",
        },
        TARGET_POPULATION: {
            code: "target_population",
            label: "Población meta",
        },
        METHOD: {
            code: "method",
            label: "Modalidad",
        },
    },
};

const SocialComponentsTrainingsFilter = ({
    trainingDataType,
    onChangeTrainingDataType,
    trainingDataGroupedBy,
    onChangeTrainingDataGroupedBy,
}) => {
    const handleChangeTrainingDataType = event => {
        onChangeTrainingDataType(event.target.value);
    };

    const handleChangeTrainingDataGroupedBy = event => {
        onChangeTrainingDataGroupedBy(event.target.value);
    };

    return (
        <Grid container justifyContent="flex-start" spacing={2}>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="chart-data-type-select-label">Mostrar</InputLabel>
                    <Select
                        labelId="chart-data-type-select-label"
                        id="chart-data-type-select"
                        value={trainingDataType}
                        label="Mostrar"
                        onChange={handleChangeTrainingDataType}
                    >
                        {Object.values(TRAINING_DATA_FILTER.DATA_TYPE).map(dataType => (
                            <MenuItem key={dataType.code} value={dataType.code}>
                                {dataType.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="chart-data-type-select-label">
                        Agrupado por
                    </InputLabel>
                    <Select
                        labelId="chart-group-select-label"
                        id="chart-group-select"
                        value={trainingDataGroupedBy}
                        label="Agrupado por"
                        onChange={handleChangeTrainingDataGroupedBy}
                    >
                        {Object.values(TRAINING_DATA_FILTER.GROUPED_BY).map(
                            groupedBy => (
                                <MenuItem key={groupedBy.code} value={groupedBy.code}>
                                    {groupedBy.label}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export {SocialComponentsTrainingsFilter as default, TRAINING_DATA_FILTER};
