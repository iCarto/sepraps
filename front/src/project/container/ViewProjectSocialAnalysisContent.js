import {useParams} from "react-router-dom";

import {ViewTrainingsAnalysisContent} from "socialComponentMonitoring/container";

const ViewProjectSocialAnalysisContent = () => {
    const {id: projectId} = useParams();

    return (
        <ViewTrainingsAnalysisContent
            filter={{project: projectId}}
            showProject={true}
        />
    );
};

export default ViewProjectSocialAnalysisContent;
