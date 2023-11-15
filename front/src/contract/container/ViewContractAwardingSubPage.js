import {useOutletContext} from "react-router-dom";
import {ContractContractorSection} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";
import {ViewOrUpdateContractContent} from ".";

const ViewContractAwardingSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ViewOrUpdateContractContent
            contract={contract}
            section="awarding"
            label="Adjudicación"
        />,
        <ViewOrUpdateContractContent
            contract={contract}
            section="insurance"
            label="Seguros"
        />,
        <ContractContractorSection contract={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractAwardingSubPage;