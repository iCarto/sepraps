import {ContractService, TEMPLATE} from "contract/service";
import {EntityMenuDropDown} from "base/entity/components/presentational";
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

    const entityInfo = contract
        ? {
              id: contract?.id,
              title: "Contrato:",
              slug: "contracts",
              primaryInfo: contract?.number,
              secondaryInfo: contract?.bid_request_number,
              tag: null,
          }
        : null;

    return (
        <EntityMenuDropDown
            entityInfo={entityInfo}
            service={ContractService.getList}
            template={TEMPLATE.SHORT}
            getDropdownItemContent={getDropdownItemContent}
        />
    );
};

export default SelectContractDropDown;
