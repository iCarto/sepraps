import {DynamicSectionFields} from "base/dynamicform/components";

const ContractServiceData = ({contractService}) => {
    return (
        contractService &&
        contractService.properties && (
            <DynamicSectionFields attributes={contractService.properties} columns={1} />
        )
    );
};

export default ContractServiceData;
