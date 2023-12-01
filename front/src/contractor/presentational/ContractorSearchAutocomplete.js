import {ContractorService} from "contractor/service";
import {SearchAutocomplete} from "base/search/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ContractorSearchAutocomplete = ({handleSelect, defaultValue = null}) => {
    const optionComponent = option => {
        return (
            <Stack>
                <Typography>{option.name}</Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    {option.contract_type_name}
                </Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    {option.phone} - {option.email}
                </Typography>
            </Stack>
        );
    };

    return (
        <SearchAutocomplete
            label="Buscar un contratista"
            optionLabel="name"
            optionComponent={optionComponent}
            search={ContractorService.getAllBySearchText}
            handleSelect={handleSelect}
            defaultValue={defaultValue}
        />
    );
};

export default ContractorSearchAutocomplete;
