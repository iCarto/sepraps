import {useOutletContext} from "react-router-dom";

import {SectionCard} from "base/ui/section/components";
import {ViewSocialComponentsTrainingsChart} from "socialcomponents/container";

const ViewContractProjectSocialAnalysisSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        <SectionCard title="Supervisión social">
            <ViewSocialComponentsTrainingsChart filter={{contract: contract.id}} />
        </SectionCard>
    );
};

export default ViewContractProjectSocialAnalysisSubPage;
