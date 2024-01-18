import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {
    ViewSocialComponentsTrainingsChart,
    ViewSocialComponentsTrainingsTotalsTab,
} from "socialComponent/container";

import {SubpageWithSelectorContainer} from "base/ui/main";
import {SectionCard} from "base/ui/section/components";
import {ComponentListSelector} from "component/presentational";

const ViewProjectSocialAnalysisContent = () => {
    const {scMonitorings} = useOutletContext();
    const {id: projectId, socialComponentId} = useParams();
    const location = useLocation();

    const isRootPath =
        location.pathname.split("/").slice(-1)[0] === "buildingcomponents";

    return (
        <SubpageWithSelectorContainer
            itemsName="componentes sociales"
            itemSelector={
                <ComponentListSelector
                    components={scMonitorings}
                    basePath={`/projects/list/${projectId}/socialcomponents`}
                    selectedComponentId={parseInt(socialComponentId)}
                    reduceItemsFontSize
                />
            }
            noItems={isRootPath && scMonitorings && scMonitorings.length === 0}
        >
            <SectionCard title="Supervisión de componentes sociales">
                <ViewSocialComponentsTrainingsTotalsTab filter={{project: projectId}} />
                <ViewSocialComponentsTrainingsChart filter={{project: projectId}} />
            </SectionCard>
        </SubpageWithSelectorContainer>
    );
};

export default ViewProjectSocialAnalysisContent;
