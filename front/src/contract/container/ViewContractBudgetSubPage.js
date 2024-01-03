import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/components/container";
import {ViewOrUpdateContractContent} from ".";

const ViewContractBudgetSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ViewOrUpdateContractContent
            contract={contract}
            section="generaldata"
            label="Información"
        />,
        <ViewOrUpdateContractContent
            contract={contract}
            section="financing_program"
            label="Financiación"
        />,
        <ViewOrUpdateContractContent
            contract={contract}
            section="bidrequest"
            label="Licitación"
        />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractBudgetSubPage;
