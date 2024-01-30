import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsSummaryList,
    SocialComponentsTotalsContent,
    TRAINING_DATA_FILTER,
} from "socialComponent/presentational";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {PaperComponent} from "base/shared/components";

const ViewSocialComponentsOverview = () => {
    const {project, scMonitorings, connection} = useOutletContext();

    const [trainingsTotals, setTrainingsTotals] = useState(null);

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
        ProjectStatsService.getSocialComponentTrainingsStats(
            trainingDataGroupedBy,
            filter
        )
            .then(data => {
                setTrainingsTotals(getTotalsOnly(data));
            })
            .catch(error => {
                console.log(error);
            });
    }, [project]);

    return (
        <Stack spacing={1}>
            <PaperComponent>
                <SocialComponentsTotalsContent
                    trainingsTotals={trainingsTotals}
                    connection={connection}
                />
            </PaperComponent>
            <PaperComponent>
                <SocialComponentsSummaryList socialComponents={scMonitorings} />
            </PaperComponent>
        </Stack>
    );
};

export default ViewSocialComponentsOverview;
