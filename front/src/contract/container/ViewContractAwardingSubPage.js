import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/components/container";
import {ViewOrUpdateContractContent, ViewOrUpdateContractContractorContent} from ".";

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
        <ViewOrUpdateContractContractorContent contract={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractAwardingSubPage;
