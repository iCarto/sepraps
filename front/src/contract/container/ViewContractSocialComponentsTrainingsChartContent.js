import {PaperComponent} from "base/shared/components";
import {useOutletContext} from "react-router-dom";

import {ViewSocialComponentsTrainingsChart} from "socialComponent/container";

const ViewContractSocialComponentsTrainingsChartContent = () => {
    const {contract} = useOutletContext();

    return (
        <PaperComponent>
            <ViewSocialComponentsTrainingsChart filter={{contract: contract.id}} />
        </PaperComponent>
    );
};

export default ViewContractSocialComponentsTrainingsChartContent;
