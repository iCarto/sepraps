import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {ProjectStatsService} from "project/service";

import {
    SocialComponentsTotalsContent,
    TRAINING_DATA_FILTER,
} from "socialComponent/presentational";

import Stack from "@mui/material/Stack";

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
        <Stack spacing={2}>
            <SocialComponentsTotalsContent
                socialComponents={scMonitorings}
                trainingsTotals={trainingsTotals}
                connection={connection}
            />
        </Stack>
    );
};

export default ViewSocialComponentsOverview;
