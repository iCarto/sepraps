import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SocialComponentsTrainingsTableFilter = ({
    trainingData,
    filterBy,
    onChangeFilter,
}) => {
    const handleChangeTrainingDataGroupedBy = event => {
        onChangeFilter(event.target.value);
    };

    const getFilterOptionObject = (dataObject, keyForCode, keyForLabel) => {
        const codes = [...new Set(dataObject[keyForCode])] || [];
        const labels = [...new Set(dataObject[keyForLabel])] || [];

        const optionsList = codes
            .map((code, index) => ({code: code, label: labels[index]}))
            .filter(item => item.code !== null && item.label !== null);

        return optionsList;
    };

    const contractOptions = getFilterOptionObject(
        trainingData,
        "contract_id",
        "contract_number"
    );

    const contractorOptions = getFilterOptionObject(
        trainingData,
        "contractor_id",
        "contractor_name"
    );

    const serviceOptions = getFilterOptionObject(
        trainingData,
        "social_component_monitoring_code",
        "social_component_monitoring_name"
    );

    return (
        <Grid container justifyContent="flex-start" spacing={2}>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="chart-data-contract-select-label">
                        Servicio
                    </InputLabel>
                    <Select
                        labelId="chart-group-select-label"
                        id="chart-group-select"
                        value={filterBy}
                        label="Servicio"
                        onChange={handleChangeTrainingDataGroupedBy}
                    >
                        {Object.values(serviceOptions).map(groupedBy => (
                            <MenuItem key={groupedBy.code} value={groupedBy.code}>
                                {groupedBy.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="chart-data-contract-select-label">
                        Contrato
                    </InputLabel>
                    <Select
                        labelId="chart-group-select-label"
                        id="chart-group-select"
                        value={filterBy}
                        label="Contrato"
                        onChange={handleChangeTrainingDataGroupedBy}
                    >
                        {Object.values(contractOptions).map(groupedBy => (
                            <MenuItem key={groupedBy.code} value={groupedBy.code}>
                                {groupedBy.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="chart-data-contract-select-label">
                        Contratista
                    </InputLabel>
                    <Select
                        labelId="chart-group-select-label"
                        id="chart-group-select"
                        value={filterBy}
                        label="Contratista"
                        onChange={handleChangeTrainingDataGroupedBy}
                    >
                        {Object.values(contractorOptions).map(groupedBy => (
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

export {SocialComponentsTrainingsTableFilter as default};
