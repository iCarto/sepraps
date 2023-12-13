import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsTrainingsChart,
    SocialComponentsTrainingsFilter,
    SocialComponentsTrainingsTable,
    TRAINING_DATA_FILTER,
} from "socialComponent/presentational";
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
            <Grid container>
                <Grid item container xs={8}>
                    <SocialComponentsTrainingsFilter
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
                <Grid>
                    <SocialComponentsTrainingsTable
                        trainingData={trainingData}
                        trainingDataType={trainingDataType}
                    />
                </Grid>
            </Grid>
        )
    );
};

export default ViewSocialComponentsTrainingsChart;
