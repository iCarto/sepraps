import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {
    ViewSocialComponentsTrainingsChart,
    ViewSocialComponentsTrainingsTotalsTable,
} from "socialComponent/container";

import {SubpageWithSelectorContainer} from "base/ui/main";
import {SectionCard} from "base/ui/section/components";
import {ComponentListSelector} from "component/presentational";
import Stack from "@mui/material/Stack";

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
            <Stack spacing={2}>
                <SectionCard>
                    <ViewSocialComponentsTrainingsChart filter={{project: projectId}} />
                </SectionCard>
                <SectionCard>
                    <ViewSocialComponentsTrainingsTotalsTable
                        filter={{project: projectId}}
                    />
                </SectionCard>
            </Stack>
        </SubpageWithSelectorContainer>
    );
};

export default ViewProjectSocialAnalysisContent;
