import {ContractService} from "service/api";
import {DateUtil} from "utilities";
import {SearchAutocomplete} from "components/common/presentational";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ContractSearchAutocomplete = ({handleSelect}) => {
    const optionComponent = option => {
        return (
            <Stack>
                <Typography>{option.number}</Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    ({option.bid_request_id} -{" "}
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
            search={ContractService.getContractsBySearchText}
            handleSelect={handleSelect}
        />
    );
};

export default ContractSearchAutocomplete;
