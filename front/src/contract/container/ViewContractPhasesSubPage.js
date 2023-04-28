import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {
    ContractAwardingSection,
    ContractBidRequestSection,
    ContractExecutionSection,
    ContractPostConstructionSection,
} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/pages";
import {DownloadEntityPDFReportButton} from "base/report/components";

const ViewContractPhasesSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    // const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    // const getIsSidePanelOpen = isOpen => {
    //     setIsSidePanelOpen(isOpen);
    // };

    const sections = [
        <ContractBidRequestSection contract={contract} />,
        <ContractAwardingSection contract={contract} />,
        <ContractExecutionSection contract={contract} />,
        <ContractPostConstructionSection contract={contract} />,
    ];

    const subPageActions = [<DownloadEntityPDFReportButton />];

    return (
        contract && (
            <EntityViewSubPage sections={sections} subPageActions={subPageActions} />
        )
    );
};

export default ViewContractPhasesSubPage;
