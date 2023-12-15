import {useOutletContext} from "react-router-dom";

import {ViewSocialComponentsAnalysisSubPage} from "socialComponent/container";

const ViewContractProjectSocialAnalysisSubPage = () => {
    let project;
    [project] = useOutletContext();

    return (
        project && (
            <ViewSocialComponentsAnalysisSubPage filter={{project: project.id}} />
        )
    );
};

export default ViewContractProjectSocialAnalysisSubPage;
