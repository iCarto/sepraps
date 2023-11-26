import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsTrainingsChart,
    SocialComponentsTrainingsFilter,
    SocialComponentsTrainingsTable,
    TRAINING_DATA_FILTER,
} from "socialcomponents/presentational";
import Stack from "@mui/material/Stack";

const ViewSocialComponentsTrainingsChart = ({filter}) => {
    const [trainingData, setTrainingData] = useState(null);
    const [trainingDataType, setTrainingDataType] = useState(
        TRAINING_DATA_FILTER.DATA_TYPE.WOMEN_MEN.code
    );
    const [trainingDataGroupedBy, setTrainingDataGroupedBy] = useState(
        TRAINING_DATA_FILTER.GROUPED_BY.COMPONENT.code
    );

    useEffect(() => {
        ProjectStatsService.getSocialComponentTrainingsStats(
            trainingDataGroupedBy,
            filter
        ).then(chartData => {
            setTrainingData(chartData);
        });
    }, [filter, trainingDataGroupedBy]);

    return (
        trainingData && (
            <Stack spacing={2}>
                <SocialComponentsTrainingsFilter
                    trainingDataType={trainingDataType}
                    onChangeTrainingDataType={value => setTrainingDataType(value)}
                    trainingDataGroupedBy={trainingDataGroupedBy}
                    onChangeTrainingDataGroupedBy={value =>
                        setTrainingDataGroupedBy(value)
                    }
                />
                <SocialComponentsTrainingsChart
                    trainingData={trainingData}
                    trainingDataType={trainingDataType}
                />
                <SocialComponentsTrainingsTable
                    trainingData={trainingData}
                    trainingDataType={trainingDataType}
                />
            </Stack>
        )
    );
};

export default ViewSocialComponentsTrainingsChart;
