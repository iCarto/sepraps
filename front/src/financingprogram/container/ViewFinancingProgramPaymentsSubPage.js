import {useOutletContext} from "react-router-dom";

import {ViewPaymentsAnalysisContent} from "payment/container";

const ViewFinancingProgramPaymentsSubPage = () => {
    const [financingProgram] = useOutletContext();

    return (
        <ViewPaymentsAnalysisContent
            filter={{financing_program: financingProgram.id}}
            showContract={true}
        />
    );
};

export default ViewFinancingProgramPaymentsSubPage;
