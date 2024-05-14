import {useOutletContext} from "react-router-dom";

import {contracts_api_adapter} from "contract/model";

import {ViewOrUpdateContractContent} from ".";
import {ContractRelatedContractsSection} from "contract/presentational";
import {NotificationsSection} from "notification/presentational";
import {EntityViewSubPage} from "base/entity/components/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";

const ViewContractSummarySubPage = () => {
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
            edit={false}
        />,
        <NotificationsSection notifications={notifications} hideIfEmpty={true} />,
        <ContractRelatedContractsSection contracts={relatedContracts} />,
        <EntityAuditSection entity={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractSummarySubPage;
