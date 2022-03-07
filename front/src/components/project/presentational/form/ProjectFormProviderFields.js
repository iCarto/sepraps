import {useState} from "react";
import {useFormContext} from "react-hook-form";

import {
    ProviderFormFields,
    ProviderFormSearch,
} from "components/provider/presentational";

import Grid from "@mui/material/Grid";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const emptyProvider = {
    id: null,
    name: "",
    area: "",
    department: "",
    district: "",
    locality: "",
};

const ProjectFormProviderFields = () => {
    const {getValues, reset} = useFormContext();

    const [selectedOption, setSelectedOption] = useState("new");

    const changeProviderFormValues = provider => {
        const values = getValues();
        values["provider_id"] = provider.id;
        values["provider_name"] = provider.name;
        values["provider_area"] = provider.area;
        values["provider_location"] = {
            department: provider.department,
            district: provider.district,
            locality: provider.locality,
        };
        reset({
            ...values,
        });
    };

    const handleChange = (event, selectedOption) => {
        setSelectedOption(selectedOption);
        changeProviderFormValues(emptyProvider);
    };

    const handleSelectExistingProvider = selectedExistingProvider => {
        const values = getValues();
        values["provider_id"] = selectedExistingProvider.id;
        values["provider_name"] = selectedExistingProvider.name;
        values["provider_area"] = selectedExistingProvider.area;
        values["provider_location"] = {
            department: selectedExistingProvider.locality.department,
            district: selectedExistingProvider.locality.district,
            locality: selectedExistingProvider.locality.code,
        };
        reset({
            ...values,
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item container justifyContent="center" xs={12}>
                <ToggleButtonGroup
                    color="primary"
                    value={selectedOption}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="new">Crear nuevo</ToggleButton>
                    <ToggleButton value="existing">Seleccionar existente</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
                {selectedOption === "new" ? (
                    <ProviderFormFields />
                ) : (
                    <ProviderFormSearch
                        onClickSelected={handleSelectExistingProvider}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default ProjectFormProviderFields;
