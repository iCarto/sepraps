import {useState} from "react";
import {useFormContext} from "react-hook-form";

import {
    AddProviderButtonGroup,
    ProviderFormFields,
    ProviderFormSearch,
} from "components/provider/presentational";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const emptyProvider = {
    id: null,
    name: "",
    area: "",
    locality: {
        code: "",
        district: "",
        department: "",
    },
};

const ProjectFormProviderFields = () => {
    const {getValues, reset} = useFormContext();

    const [selectedOption, setSelectedOption] = useState(null);

    const changeProviderFormValues = provider => {
        const values = getValues();
        if (!provider) {
            provider = emptyProvider;
        }
        values["provider_id"] = provider.id;
        values["provider_name"] = provider.name;
        values["provider_area"] = provider.area;
        values["provider_location"] = {
            department: provider.locality.department,
            district: provider.locality.district,
            locality: provider.locality.code,
        };
        reset({
            ...values,
        });
    };

    const handleChange = (selectedOption = null) => {
        setSelectedOption(selectedOption);
        changeProviderFormValues(emptyProvider);
    };

    const handleSelectExistingProvider = selectedExistingProvider => {
        changeProviderFormValues(selectedExistingProvider);
    };

    return (
        <Grid container spacing={2}>
            <Grid item container xs={12} justifyContent="center">
                {!selectedOption ? (
                    <AddProviderButtonGroup
                        onAdd={() => handleChange("add")}
                        onSearch={() => handleChange("search")}
                    />
                ) : (
                    <Button
                        id="menu-button"
                        variant="text"
                        onClick={() => handleChange()}
                        startIcon={<LinkOffIcon />}
                    >
                        Quitar
                    </Button>
                )}
            </Grid>
            <Grid item xs={12}>
                {selectedOption === "add" && <ProviderFormFields />}
                {selectedOption === "search" && (
                    <ProviderFormSearch
                        onClickSelected={handleSelectExistingProvider}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default ProjectFormProviderFields;
