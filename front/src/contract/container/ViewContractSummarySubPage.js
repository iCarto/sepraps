import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/components/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ViewOrUpdateContractContent} from ".";
import {ContractRelatedContractsSection} from "contract/presentational";

const ViewContractSummarySubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ViewOrUpdateContractContent
            contract={contract}
            section="generaldata"
            label="Información"
        />,
        <ContractRelatedContractsSection contracts={contract.related_contracts} />,
        <EntityAuditSection entity={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractSummarySubPage;
