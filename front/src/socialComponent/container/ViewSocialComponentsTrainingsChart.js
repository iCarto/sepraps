import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsTrainingsChart,
    SocialComponentsTrainingsChartFilter,
    TRAINING_DATA_FILTER,
} from "socialComponent/presentational";
import {AlertError} from "base/error/components";
import {Spinner} from "base/shared/components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ViewSocialComponentsTrainingsChart = ({filter}) => {
    const [trainingData, setTrainingData] = useState(null);
    const [trainingDataType, setTrainingDataType] = useState(
        TRAINING_DATA_FILTER.DATA_TYPE.WOMEN_MEN.code
    );
    const [trainingDataGroupedBy, setTrainingDataGroupedBy] = useState(
        TRAINING_DATA_FILTER.GROUPED_BY.COMPONENT.code
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        ProjectStatsService.getSocialComponentTrainingsStats(
            trainingDataGroupedBy,
            filter
        )
            .then(chartData => {
                setTrainingData(chartData);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [filter, trainingDataGroupedBy]);

    return isLoading ? (
        <Spinner />
    ) : (
        <Grid container>
            <AlertError error={error} />
            <Grid item container xs={8}>
                <SocialComponentsTrainingsChartFilter
                    trainingDataType={trainingDataType}
                    onChangeTrainingDataType={value => setTrainingDataType(value)}
                    trainingDataGroupedBy={trainingDataGroupedBy}
                    onChangeTrainingDataGroupedBy={value =>
                        setTrainingDataGroupedBy(value)
                    }
                />
                <Box mt={2}>
                    <SocialComponentsTrainingsChart
                        trainingData={trainingData}
                        trainingDataType={trainingDataType}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default ViewSocialComponentsTrainingsChart;
