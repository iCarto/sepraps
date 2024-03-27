import {useOutletContext} from "react-router-dom";

import {ViewPaymentsAnalysisContent} from "payment/container";

const ViewContractPaymentsAnalysisContent = () => {
    const {contract} = useOutletContext();

    const filterStartDate = contract.execution_start_date;
    const filterEndDate =
        contract.amended_expected_execution_end_date ||
        contract.expected_execution_end_date;

    const maxAmount = contract.awarding_budget_min
        ? [contract.awarding_budget_min, contract.awarding_budget]
        : contract.awarding_budget;

    const maxAmendedAmount =
        contract.total_awarding_budget !== maxAmount
            ? contract.total_awarding_budget
            : null;
    const maxEndDate = contract.expected_execution_end_date;
    const maxAmendedEndDate = contract.amended_expected_execution_end_date;

    return (
        <ViewPaymentsAnalysisContent
            filter={{
                contract: contract.id,
            }}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            maxAmount={maxAmount}
            maxAmendedAmount={maxAmendedAmount}
            maxEndDate={maxEndDate}
            maxAmendedEndDate={maxAmendedEndDate}
        />
    );
};

export default ViewContractPaymentsAnalysisContent;
