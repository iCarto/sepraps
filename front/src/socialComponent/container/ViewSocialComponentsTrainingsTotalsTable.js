import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsDownloadButton,
    SocialComponentsTrainingsTableFilter,
    SocialComponentsTrainingsTotalsTable,
} from "socialComponent/presentational";
import {AlertError} from "base/error/components";
import Stack from "@mui/material/Stack";

const ViewSocialComponentsTrainingsTotalsTable = ({filter}) => {
    const [trainingData, setTrainingData] = useState(null);
    const [isTrainingDataEmpty, setIsTrainingDataEmpty] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        ProjectStatsService.getSocialComponentTrainingsTotalStats(filter)
            .then(chartData => {
                setTrainingData(chartData);
                setIsTrainingDataEmpty(getIsTrainingDataEmpty(chartData));
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [filter]);

    const getIsTrainingDataEmpty = trainingData => {
        const combinedTrainingDataValues = Object.values(trainingData).flat();
        return combinedTrainingDataValues.every(
            value => value === 0 || value === "Total"
        );
    };

    return trainingData && !isTrainingDataEmpty ? (
        <>
            <AlertError error={error} />
            <Stack alignItems="flex-end" spacing={1}>
                <SocialComponentsTrainingsTableFilter
                    trainingData={trainingData}
                    filterBy={undefined}
                    onChangeFilter={undefined}
                />
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
        </>
    ) : null;
};

export default ViewSocialComponentsTrainingsTotalsTable;
