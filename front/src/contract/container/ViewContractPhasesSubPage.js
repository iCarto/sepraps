import {useOutletContext} from "react-router-dom";
import {
    ContractAwardingSection,
    ContractBidRequestSection,
    ContractExecutionSection,
    ContractPostConstructionSection,
} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewContractPhasesSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ContractBidRequestSection contract={contract} />,
        <ContractAwardingSection contract={contract} />,
        <ContractExecutionSection contract={contract} />,
        <ContractPostConstructionSection contract={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractPhasesSubPage;
