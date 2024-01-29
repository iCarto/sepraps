import {useParams} from "react-router-dom";

import {
    ViewSocialComponentsTrainingsChart,
    ViewSocialComponentsTrainingsTotalsTable,
} from "socialComponent/container";

import {SectionCard} from "base/ui/section/components";
import Stack from "@mui/material/Stack";

const ViewProjectSocialAnalysisContent = () => {
    const {id: projectId} = useParams();

    return (
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
    );
};

export default ViewProjectSocialAnalysisContent;
