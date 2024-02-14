import {useParams} from "react-router-dom";

import {ViewBuildingComponentsFinancialChart} from "buildingComponent/container";
import {SectionCard} from "base/ui/section/components";

const ViewBuildingComponentsAnalysisContent = () => {
    const {id: projectId} = useParams();

    return (
        <SectionCard>
            <ViewBuildingComponentsFinancialChart filter={{project: projectId}} />
        </SectionCard>
    );
};

export default ViewBuildingComponentsAnalysisContent;
