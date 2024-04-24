import {useOutletContext} from "react-router-dom";

import {ViewTrainingsAnalysisContent} from "socialComponentMonitoring/container";

const ViewFinancingProgramTrainingsSubPage = () => {
    const [financingProgram] = useOutletContext();

    return (
        <ViewTrainingsAnalysisContent
            filter={{financing_program: financingProgram.id}}
            showContract={true}
            showProject={true}
        />
    );
};

export default ViewFinancingProgramTrainingsSubPage;
