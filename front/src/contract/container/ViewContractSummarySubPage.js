import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/components/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ContractGeneralDataSection} from "contract/presentational/section";

const ViewContractSummarySubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ContractGeneralDataSection contract={contract} />,
        <EntityAuditSection entity={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractSummarySubPage;
