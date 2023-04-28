import {ProviderService} from "provider/service";
import {SearchAutocomplete} from "base/search/components";

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
            search={ProviderService.getBySearchText}
            handleSelect={handleSelect}
        />
    );
};

export default ProviderSearchAutocomplete;
