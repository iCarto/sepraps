import {useOutletContext} from "react-router-dom";

import {ViewPaymentContractFinancialChart} from ".";
import {SectionCard} from "base/ui/section/components";

const ViewCertificationsAnalysisContent = () => {
    const {project} = useOutletContext();

    return (
        <SectionCard title="Seguimiento financiero">
            {/* <ViewPaymentContractFinancialChart contract={contract} /> */}
        </SectionCard>
    );
};

export default ViewCertificationsAnalysisContent;
