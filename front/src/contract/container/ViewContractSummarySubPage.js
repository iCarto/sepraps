import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/pages";
import {EntityAuditSection} from "base/entity/sections";
import {ContractGeneralDataSection} from "contract/presentational/section";
import {
    ContractContractorSection,
    ContractFinancingProgramSection,
} from "contract/presentational/section";

const ViewContractSummarySubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ContractGeneralDataSection contract={contract} />,
        <ContractFinancingProgramSection contract={contract} />,
        <ContractContractorSection contract={contract} />,
        <EntityAuditSection entity={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractSummarySubPage;
