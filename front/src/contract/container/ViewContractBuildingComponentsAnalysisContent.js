import {useOutletContext} from "react-router-dom";

import {ViewBuildingComponentsAnalysisContent} from "buildingComponent/container";

const ViewContractBuildingComponentsAnalysisContent = () => {
    const {contract} = useOutletContext();

    return (
        <ViewBuildingComponentsAnalysisContent
            filter={{contract: contract.id}}
            showProject={true}
        />
    );
};

export default ViewContractBuildingComponentsAnalysisContent;
