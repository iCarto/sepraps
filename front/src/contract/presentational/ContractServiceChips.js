import {ContractServiceChip} from ".";
import Stack from "@mui/material/Stack";

const ContractServiceChips = ({serviceLabels}) => {
    return serviceLabels.length ? (
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {serviceLabels.split(",").map((service, index) => (
                <ContractServiceChip service={service.trim()} key={index} />
            ))}
        </Stack>
    ) : null;
};

export default ContractServiceChips;
