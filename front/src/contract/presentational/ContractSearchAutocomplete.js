import {ContractService} from "contract/service";
import {DateUtil} from "base/format/utilities";
import {SearchAutocomplete} from "base/search/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ContractSearchAutocomplete = ({handleSelect, defaultValue = null}) => {
    const optionComponent = option => {
        return (
            <Stack>
                <Typography>{option.number}</Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    ({option.bid_request_number} -{" "}
                    {DateUtil.formatDate(option.awarding_date)})
                </Typography>
            </Stack>
        );
    };

    return (
        <SearchAutocomplete
            label="Buscar un contrato"
            optionLabel="number"
            optionComponent={optionComponent}
            search={ContractService.getBySearchText}
            handleSelect={handleSelect}
            defaultValue={defaultValue}
        />
    );
};

export default ContractSearchAutocomplete;
