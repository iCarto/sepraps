import {useOutletContext} from "react-router-dom";

import {SectionCard} from "base/ui/section/components";
import {
    ViewBuildingComponentsFinancialChart,
    ViewBuildingComponentsFinancialData,
} from "buildingcomponents/container";

const ViewContractProjectAnalysisSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        <SectionCard title="Supervisión de componentes de construcción">
            <ViewBuildingComponentsFinancialChart filter={{contract: contract.id}} />
            <ViewBuildingComponentsFinancialData filter={{contract: contract.id}} />
        </SectionCard>
    );
};

export default ViewContractProjectAnalysisSubPage;
