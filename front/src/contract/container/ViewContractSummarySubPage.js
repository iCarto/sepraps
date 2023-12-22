import {useOutletContext} from "react-router-dom";

import {contracts_api_adapter} from "contract/model";

import {EntityViewSubPage} from "base/entity/components/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ContractRelatedContractsSection} from "contract/presentational";
import {ViewOrUpdateContractContent} from ".";

const ViewContractSummarySubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const relatedContracts = contracts_api_adapter(contract.related_contracts);

    const sections = [
        <ViewOrUpdateContractContent
            contract={contract}
            section="generaldata"
            label="Información"
        />,
        <ContractRelatedContractsSection contracts={relatedContracts} />,
        <EntityAuditSection entity={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractSummarySubPage;
