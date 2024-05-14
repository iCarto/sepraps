import {useOutletContext} from "react-router-dom";

import {ViewTrainingsAnalysisContent} from "socialComponentMonitoring/container";

const ViewContractTrainingsAnalysisContent = () => {
    const {contract} = useOutletContext();

    return (
        <ViewTrainingsAnalysisContent
            filter={{contract: contract.id}}
            showProject={true}
        />
    );
};

export default ViewContractTrainingsAnalysisContent;
