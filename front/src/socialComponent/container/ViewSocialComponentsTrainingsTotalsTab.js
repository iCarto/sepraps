import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsDownloadButton,
    SocialComponentsTrainingsTotalsTable,
} from "socialComponent/presentational";
import Grid from "@mui/material/Grid";

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
            <Grid container justifyContent="flex-end">
                <SocialComponentsTrainingsTotalsTable trainingData={trainingData} />
                <SocialComponentsDownloadButton
                    service={format => {
                        console.log("paso");
                        return ProjectStatsService.getSocialComponentTrainingsTotalStats(
                            filter,
                            format
                        );
                    }}
                />
            </Grid>
        )
    );
};

export default ViewSocialComponentsTrainingsTotalsTab;
