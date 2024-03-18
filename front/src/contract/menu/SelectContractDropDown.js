import {ContractService, TEMPLATE} from "contract/service";
import {EntityMenuDropDown} from "base/entity/components/presentational";
import {ContractServiceChip} from "contract/presentational";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SelectContractDropDown = ({contract}) => {
    const renderDropdownItem = eachContract => {
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
            title="Contrato"
            primary={contract?.number}
            secondary={contract?.bid_request_number}
            tag={contract.services_label.split(",").map((service, index) => (
                <ContractServiceChip service={service} key={index} />
            ))}
            basePath={"/contracts/list"}
            service={ContractService.getList}
            template={TEMPLATE.SHORT}
            renderDropdownItem={renderDropdownItem}
        />
    );
};

export default SelectContractDropDown;
