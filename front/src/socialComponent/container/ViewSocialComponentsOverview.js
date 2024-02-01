import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsSummaryList,
    SocialComponentsTotalsContent,
    TRAINING_DATA_FILTER,
} from "socialComponent/presentational";
import {PaperComponent, Spinner} from "base/shared/components";
import {AlertError} from "base/error/components";

import Stack from "@mui/material/Stack";

const ViewSocialComponentsOverview = () => {
    const {project, scMonitorings, connection} = useOutletContext();

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
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <AlertError error={error} />
                        <SocialComponentsTotalsContent
                            trainingsTotals={trainingsTotals}
                            connection={connection}
                        />
                    </>
                )}
            </PaperComponent>
            <PaperComponent>
                <SocialComponentsSummaryList socialComponents={scMonitorings} />
            </PaperComponent>
        </Stack>
    );
};

export default ViewSocialComponentsOverview;
