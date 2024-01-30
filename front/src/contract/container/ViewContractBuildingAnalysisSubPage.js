import {useParams} from "react-router-dom";

import {ViewContractBuildingAnalysisOverview} from ".";
import {ViewBuildingComponentsFinancialChart} from "buildingComponent/container";
import {TabContainerWithoutNavigation} from "base/ui/tab/components";
import {PaperContainer} from "base/shared/components";

const ViewContractBuildingAnalysisSubPage = () => {
    const {id: contractId} = useParams();

    const tabs = [
        {
            label: "Vista general",
            content: <ViewContractBuildingAnalysisOverview contractId={contractId} />,
        },
        {
            label: "Gráfico",
            content: (
                <ViewBuildingComponentsFinancialChart filter={{contract: contractId}} />
            ),
        },
    ];

    return (
        <PaperContainer>
            <TabContainerWithoutNavigation
                label="contract-building-analysis"
                tabs={tabs}
            />
        </PaperContainer>
    );
};

export default ViewContractBuildingAnalysisSubPage;
