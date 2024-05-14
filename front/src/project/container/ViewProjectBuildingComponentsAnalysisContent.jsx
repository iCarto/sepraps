import {useParams} from "react-router-dom";

import {ViewBuildingComponentsAnalysisContent} from "buildingComponent/container";

const ViewProjectBuildingComponentsAnalysisContent = () => {
    const {id: projectId} = useParams();

    return <ViewBuildingComponentsAnalysisContent filter={{project: projectId}} />;
};

export default ViewProjectBuildingComponentsAnalysisContent;
