import {SectionCard} from "base/ui/section/components";
import {ProjectStatsService} from "project/service";
import {
    SocialComponentsDownloadButton,
    SocialComponentsTrainingsTotalsTable,
} from "socialComponent/presentational";
import Stack from "@mui/material/Stack";

const ViewSocialComponentTrainingsStats = ({trainingData, filter}) => {
    const isData =
        trainingData &&
        !Object.values(trainingData).every(
            value => value.includes(0) || value.includes("total")
        );

    return trainingData ? (
        <SectionCard>
            <Stack alignItems="flex-end" spacing={1}>
                <SocialComponentsTrainingsTotalsTable
                    trainingData={trainingData}
                    totalsOnly
                    small
                />
                {isData ? (
                    <SocialComponentsDownloadButton
                        service={format => {
                            return ProjectStatsService.getSocialComponentTrainingsTotalStats(
                                filter,
                                format
                            );
                        }}
                    />
                ) : null}
            </Stack>
        </SectionCard>
    ) : null;
};

export default ViewSocialComponentTrainingsStats;
