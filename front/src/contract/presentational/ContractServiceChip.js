import {GenericChip} from "base/shared/components";
import ContractServiceIcon from "./ContractServiceIcon";

const ContractServiceChip = ({service: label}) => {
    return (
        <GenericChip
            avatar={<ContractServiceIcon contractService={label} />}
            label={label}
        />
    );
};

export default ContractServiceChip;
