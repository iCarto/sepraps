import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {ViewBuildingComponentsFinancialChart} from "buildingComponent/container";
import {SectionCard} from "base/ui/section/components";
import {SubpageWithSelectorContainer} from "base/ui/main";
import {ComponentListSelector} from "component/presentational";

const ViewBuildingComponentsAnalysisContent = () => {
    const {bcMonitorings} = useOutletContext();
    const {id: projectId, buildingComponentId} = useParams();
    const location = useLocation();

    const isRootPath =
        location.pathname.split("/").slice(-1)[0] === "buildingcomponents";

    return (
        <SubpageWithSelectorContainer
            itemsName="componentes de construcción"
            itemSelector={
                <ComponentListSelector
                    components={bcMonitorings}
                    basePath={`/projects/list/${projectId}/buildingcomponents`}
                    selectedComponentId={parseInt(buildingComponentId)}
                />
            }
            noItems={isRootPath && bcMonitorings && bcMonitorings.length === 0}
        >
            <SectionCard>
                <ViewBuildingComponentsFinancialChart
                    filter={{project: projectId}}
                    displayGroupedBy
                />
            </SectionCard>
        </SubpageWithSelectorContainer>
    );
};

export default ViewBuildingComponentsAnalysisContent;
