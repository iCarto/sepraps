import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";
import {BC_DATA_FILTER} from "buildingComponent/presentational/BuildingComponentsFilter";

import {
    BuildingComponentsFilter,
    BuildingComponentsFinancialChart,
} from "buildingComponent/presentational";
import {Spinner} from "base/shared/components";
import {AlertError} from "base/error/components";
import Grid from "@mui/material/Grid";
import {SectionCard} from "base/ui/section/components";

const ViewBuildingComponentsFinancialChart = ({filter, displayGroupedBy = false}) => {
    const [chartData, setChartData] = useState(null);
    const [groupedBy, setGroupedBy] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        ProjectStatsService.getBuildingComponentsStats(groupedBy, filter)
            .then(chartData => {
                setIsLoading(false);
                setChartData(chartData);
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [groupedBy, filter]);

    useEffect(() => {
        if (displayGroupedBy) setGroupedBy(BC_DATA_FILTER.GROUPED_BY.UNGROUPED.code);
    }, [displayGroupedBy]);

    const handleChangeGroupedBy = value => {
        setGroupedBy(value);
    };

    return isLoading ? (
        <Spinner />
    ) : (
        <SectionCard title="Seguimiento financiero">
            <AlertError error={error} />
            <Grid container mt={1}>
                <Grid item xs={9}>
                    <BuildingComponentsFinancialChart chartDataRaw={chartData} />
                </Grid>
                {displayGroupedBy ? (
                    <Grid item xs={3}>
                        <BuildingComponentsFilter
                            groupedBy={groupedBy}
                            onChangeGroupedBy={handleChangeGroupedBy}
                        />
                    </Grid>
                ) : null}
            </Grid>
        </SectionCard>
    );
};

export default ViewBuildingComponentsFinancialChart;
