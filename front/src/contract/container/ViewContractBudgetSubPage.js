import {useOutletContext} from "react-router-dom";
import {
    ContractBidRequestSection,
    ContractGeneralDataSection,
} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewContractBudgetSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ContractGeneralDataSection contract={contract} />,
        <ContractBidRequestSection contract={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractBudgetSubPage;
