import {useOutletContext} from "react-router-dom";
import {
    ContractAwardingSection,
    ContractBidRequestSection,
    ContractContractorSection,
    ContractFinancingProgramSection,
    ContractGeneralDataSection,
} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewContractContractingSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ContractGeneralDataSection contract={contract} />,
        <ContractBidRequestSection contract={contract} />,
        <ContractAwardingSection contract={contract} />,
        <ContractContractorSection contract={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractContractingSubPage;
