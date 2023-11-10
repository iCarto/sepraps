import {useOutletContext} from "react-router-dom";
import {
    ContractExecutionSection,
    ContractPostConstructionSection,
} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewContractExecutionSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ContractExecutionSection contract={contract} />,
        <ContractPostConstructionSection contract={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractExecutionSubPage;
