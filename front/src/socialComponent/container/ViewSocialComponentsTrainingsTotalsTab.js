import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsDownloadButton,
    SocialComponentsTrainingsTotalsTable,
} from "socialComponent/presentational";
import Stack from "@mui/material/Stack";

const ViewSocialComponentsTrainingsTotalsTab = ({filter}) => {
    const [trainingData, setTrainingData] = useState(null);

    useEffect(() => {
        ProjectStatsService.getSocialComponentTrainingsTotalStats(filter).then(
            chartData => {
                setTrainingData(chartData);
            }
        );
    }, [filter]);

    return (
        trainingData && (
            <Stack alignItems="flex-end" spacing={1}>
                <SocialComponentsTrainingsTotalsTable trainingData={trainingData} />
                <SocialComponentsDownloadButton
                    service={format => {
                        return ProjectStatsService.getSocialComponentTrainingsTotalStats(
                            filter,
                            format
                        );
                    }}
                />
            </Stack>
        )
    );
};

export default ViewSocialComponentsTrainingsTotalsTab;
