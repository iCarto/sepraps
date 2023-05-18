import {EntityMenuDropDown} from "base/entity/components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SelectContractDropDown = ({contract}) => {
    const getDropdownItemContent = eachContract => {
        return (
            <Stack>
                <Typography>{eachContract.number}</Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    {eachContract.bid_request_number}
                </Typography>
            </Stack>
        );
    };

    return (
        <EntityMenuDropDown
            currentItem={contract}
            urlPrimarySlug="contracts"
            entityPrimaryInfo={contract?.number}
            entitySecondaryInfo={contract?.bid_request_number}
            headingSecondaryText="Contrato:"
            getDropdownItemContent={getDropdownItemContent}
        />
    );
};

export default SelectContractDropDown;
