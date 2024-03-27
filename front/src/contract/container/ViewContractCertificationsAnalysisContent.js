import {useOutletContext} from "react-router-dom";

import {ViewCertificationsAnalysisContent} from "certification/container";

const ViewContractCertificationsAnalysisContent = () => {
    const {contract} = useOutletContext();

    const filterStartDate = contract.execution_start_date;
    const filterEndDate =
        contract.amended_expected_execution_end_date ||
        contract.expected_execution_end_date;

    const maxEndDate = contract.expected_execution_end_date;
    const maxAmendedEndDate = contract.amended_expected_execution_end_date;

    return (
        <ViewCertificationsAnalysisContent
            filter={{contract: contract.id}}
            showProject={true}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            maxEndDate={maxEndDate}
            maxAmendedEndDate={maxAmendedEndDate}
        />
    );
};

export default ViewContractCertificationsAnalysisContent;
