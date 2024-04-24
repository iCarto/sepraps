import {DynamicSectionFields} from "base/dynamicform/components";

const ContractServiceData = ({contractService}) => {
    return (
        contractService &&
        contractService.properties && (
            <DynamicSectionFields attributes={contractService.properties} columns={2} />
        )
    );
};

export default ContractServiceData;
