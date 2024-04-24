import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsSummaryList,
    TRAINING_DATA_FILTER,
} from "socialComponent/presentational";
import {PaperComponent, Spinner} from "base/shared/components";
import {AlertError} from "base/error/components";

import Stack from "@mui/material/Stack";
import {TrainingSummaryBox} from "training/presentational";
import Grid from "@mui/material/Grid";

const ViewSocialComponentsOverview = () => {
    const {project, scMonitorings} = useOutletContext();

    const [trainingsTotals, setTrainingsTotals] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const trainingDataGroupedBy = TRAINING_DATA_FILTER.GROUPED_BY.COMPONENT.code;
    const filter = {project: project?.id};

    const getTotalsOnly = dataObject => {
        const totalsOnly = {};
        Object.keys(dataObject).map(
            key => (totalsOnly[key] = dataObject[key][dataObject[key].length - 1])
        );
        return totalsOnly;
    };

    useEffect(() => {
        setIsLoading(true);
        if (project)
            ProjectStatsService.getSocialComponentTrainingsStats(
                trainingDataGroupedBy,
                filter
            )
                .then(data => {
                    setTrainingsTotals(getTotalsOnly(data));
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error);
                    console.log(error);
                    setIsLoading(false);
                });
    }, [project]);

    return (
        <Stack spacing={1}>
            <PaperComponent>
                <Grid container>
                    <Grid item xs="auto">
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                <AlertError error={error} />
                                {trainingsTotals && (
                                    <TrainingSummaryBox
                                        trainingsTotals={trainingsTotals}
                                    />
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>
            </PaperComponent>
            <PaperComponent>
                <SocialComponentsSummaryList socialComponents={scMonitorings} />
            </PaperComponent>
        </Stack>
    );
};

export default ViewSocialComponentsOverview;
