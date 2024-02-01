import {useOutletContext} from "react-router-dom";

import {ViewPaymentContractFinancialChart} from ".";
import {SectionCard} from "base/ui/section/components";

const ViewPaymentsAnalysisContent = () => {
    const {contract} = useOutletContext();

    return (
        <SectionCard title="Seguimiento financiero">
            <ViewPaymentContractFinancialChart contract={contract} />
        </SectionCard>
    );
};

export default ViewPaymentsAnalysisContent;
