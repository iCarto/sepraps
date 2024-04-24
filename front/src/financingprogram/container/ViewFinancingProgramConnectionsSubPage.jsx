import {ViewConnectionsAnalysisContent} from "connection/container";
import {useOutletContext} from "react-router-dom";

const ViewFinancingProgramTrainingsSubPage = () => {
    const [financingProgram] = useOutletContext();

    return (
        <ViewConnectionsAnalysisContent
            filter={{financing_program: financingProgram.id}}
            showContract={true}
            showProject={true}
        />
    );
};

export default ViewFinancingProgramTrainingsSubPage;
