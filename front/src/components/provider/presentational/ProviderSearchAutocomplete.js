import {ProviderService} from "service/api";
import {SearchAutocomplete} from "components/common/presentational";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProviderSearchAutocomplete = ({handleSelect}) => {
    const optionComponent = option => {
        return (
            <Stack>
                <Typography>{option.name}</Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    ({option.locality.name} - {option.locality.district_name} -{" "}
                    {option.locality.department_name})
                </Typography>
            </Stack>
        );
    };

    return (
        <SearchAutocomplete
            label="Buscar un prestador"
            optionLabel="name"
            optionComponent={optionComponent}
            search={ProviderService.getProvidersBySearchText}
            handleSelect={handleSelect}
        />
    );
};

export default ProviderSearchAutocomplete;
