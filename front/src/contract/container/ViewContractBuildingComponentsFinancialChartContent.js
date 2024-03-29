import {useOutletContext} from "react-router-dom";

import {ViewBuildingComponentsFinancialChart} from "buildingComponent/container";
import {SectionCard} from "base/ui/section/components";

const ViewContractBuildingComponentsFinancialChartContent = () => {
    const {contract} = useOutletContext();

    return (
        <SectionCard>
            <ViewBuildingComponentsFinancialChart filter={{contract: contract.id}} />
        </SectionCard>
    );
};

export default ViewContractBuildingComponentsFinancialChartContent;
