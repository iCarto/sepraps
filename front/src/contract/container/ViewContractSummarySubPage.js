import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/pages";
import {EntityAuditSection} from "base/entity/sections";
import {ContractGeneralDataSection} from "contract/presentational/section";
import {DownloadEntityPDFReportButton} from "base/report/components";
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

    const subPageActions = [<DownloadEntityPDFReportButton />];

    return (
        contract && (
            <EntityViewSubPage sections={sections} subPageActions={subPageActions} />
        )
    );
};

export default ViewContractSummarySubPage;
