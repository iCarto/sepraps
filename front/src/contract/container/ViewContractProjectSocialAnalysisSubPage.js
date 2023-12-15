import {useOutletContext} from "react-router-dom";

import {ViewSocialComponentsAnalysisSubPage} from "socialComponent/container";

const ViewContractProjectSocialAnalysisSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        contract && (
            <ViewSocialComponentsAnalysisSubPage filter={{contract: contract.id}} />
        )
    );
};

export default ViewContractProjectSocialAnalysisSubPage;
