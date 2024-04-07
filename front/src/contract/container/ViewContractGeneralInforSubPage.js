import {useOutletContext} from "react-router-dom";

import {contracts_api_adapter} from "contract/model";

import {ViewOrUpdateContractContent} from ".";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewContractGeneralInforSubPage = () => {
    const context = useOutletContext();
    const contract = context[0];
    const notifications = context[1];

    const relatedContracts = contract
        ? contracts_api_adapter(contract.related_contracts)
        : [];

    let sections = [
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
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractGeneralInforSubPage;
