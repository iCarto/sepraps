import {useOutletContext} from "react-router-dom";
import {
    ContractAwardingSection,
    ContractContractorSection,
} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewContractAwardingSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ContractAwardingSection contract={contract} />,
        <ContractContractorSection contract={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractAwardingSubPage;
