import {ProviderService} from "provider/service";
import {SearchAutocomplete} from "base/search/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProviderSearchAutocomplete = ({handleSelect}) => {
    const optionComponent = option => {
        return (
            <Stack>
                <Typography>{option.name}</Typography>
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
