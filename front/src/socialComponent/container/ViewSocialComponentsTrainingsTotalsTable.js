import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsDownloadButton,
    SocialComponentsTrainingsTableFilterForm,
    SocialComponentsTrainingsTotalsTable,
} from "socialComponent/presentational";
import {AlertError} from "base/error/components";
import Stack from "@mui/material/Stack";

const ViewSocialComponentsTrainingsTotalsTable = ({filter}) => {
    const [trainingData, setTrainingData] = useState(null);
    const [tableFilter, setTableFilter] = useState(null);
    const [isTrainingDataEmpty, setIsTrainingDataEmpty] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        ProjectStatsService.getSocialComponentTrainingsTotalStats({
            ...filter,
            ...tableFilter,
        })
            .then(chartData => {
                setTrainingData(chartData);
                setIsTrainingDataEmpty(getIsTrainingDataEmpty(chartData));
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [filter, tableFilter]);

    const getIsTrainingDataEmpty = trainingData => {
        const combinedTrainingDataValues = Object.values(trainingData).flat();
        return combinedTrainingDataValues.every(
            value => value === 0 || value === "Total"
        );
    };

    const handleTableFilter = updatedTableFilter => {
        setTableFilter(updatedTableFilter);
    };

    return trainingData && !isTrainingDataEmpty ? (
        <>
            <AlertError error={error} />
            <Stack alignItems="flex-end" spacing={3}>
                <SocialComponentsTrainingsTableFilterForm
                    trainingData={trainingData}
                    filter={tableFilter}
                    onChangeFilter={handleTableFilter}
                />
                <SocialComponentsTrainingsTotalsTable trainingData={trainingData} />
                <SocialComponentsDownloadButton
                    service={format => {
                        return ProjectStatsService.getSocialComponentTrainingsTotalStats(
                            {...filter, ...tableFilter},
                            format
                        );
                    }}
                />
            </Stack>
        </>
    ) : null;
};

export default ViewSocialComponentsTrainingsTotalsTable;
