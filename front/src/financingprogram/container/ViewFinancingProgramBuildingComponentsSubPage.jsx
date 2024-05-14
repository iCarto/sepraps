import {useOutletContext} from "react-router-dom";

import {ViewBuildingComponentsAnalysisContent} from "buildingComponent/container";

const ViewFinancingProgramBuildingComponentsSubPage = () => {
    const [financingProgram] = useOutletContext();

    return (
        <ViewBuildingComponentsAnalysisContent
            filter={{financing_program: financingProgram.id}}
            showContract={true}
            showProject={true}
        />
    );
};

export default ViewFinancingProgramBuildingComponentsSubPage;
