import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    BuildingComponentsFilter,
    BuildingComponentsFinancialChart,
} from "buildingComponent/presentational";
import {Spinner} from "base/shared/components";
import {AlertError} from "base/error/components";
import Grid from "@mui/material/Grid";

const ViewBuildingComponentsFinancialChart = ({filter, displayGroupedBy = true}) => {
    const [chartData, setChartData] = useState(null);
    const [groupedBy, setGroupedBy] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        ProjectStatsService.getBuildingComponentsStats(groupedBy, filter)
            .then(chartData => {
                setChartData(chartData);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [groupedBy, filter]);

    const handleChangeGroupedBy = value => {
        setGroupedBy(value);
    };

    return isLoading ? (
        <Spinner />
    ) : (
        <>
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
                            globalFilter={filter}
                        />
                    </Grid>
                ) : null}
            </Grid>
        </>
    );
};

export default ViewBuildingComponentsFinancialChart;
