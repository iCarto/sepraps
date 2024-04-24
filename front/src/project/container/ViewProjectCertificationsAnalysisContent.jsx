import {useOutletContext} from "react-router-dom";

import {ViewCertificationsAnalysisContent} from "certification/container";

const ViewProjectCertificationsAnalysisContent = () => {
    const {project} = useOutletContext();

    const contract = project?.construction_contract;

    const filterStartDate = project?.init_date;
    const filterEndDate =
        contract?.amended_expected_execution_end_date ||
        contract?.expected_execution_end_date;

    const maxAmount = project?.bm_total_expected_amount;

    // TO-DO(cmatin): update when project amendments (actas) are ready
    const maxAmendedAmount = 0;
    const maxEndDate = contract?.expected_execution_end_date;
    const maxAmendedEndDate = contract?.amended_expected_execution_end_date;

    return (
        project && (
            <ViewCertificationsAnalysisContent
                filter={{
                    project: project?.id,
                }}
                filterStartDate={filterStartDate}
                filterEndDate={filterEndDate}
                maxAmount={maxAmount}
                maxAmendedAmount={maxAmendedAmount}
                maxEndDate={maxEndDate}
                maxAmendedEndDate={maxAmendedEndDate}
            />
        )
    );
};

export default ViewProjectCertificationsAnalysisContent;
