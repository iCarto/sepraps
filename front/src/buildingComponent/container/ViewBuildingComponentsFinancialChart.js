import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    BuildingComponentsFilter,
    BuildingComponentsFinancialChart,
} from "buildingComponent/presentational";
import {Spinner} from "base/shared/components";
import {AlertError} from "base/error/components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ViewBuildingComponentsFinancialChart = ({filter, displayGroupedBy = false}) => {
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
            <Grid width={{xs: "100%", lg: "80%", xl: "75%"}}>
                {displayGroupedBy ? (
                    <BuildingComponentsFilter
                        groupedBy={groupedBy}
                        onChangeGroupedBy={handleChangeGroupedBy}
                    />
                ) : null}
                <Box mt={2}>
                    <BuildingComponentsFinancialChart chartDataRaw={chartData} />
                </Box>
            </Grid>
        </>
    );
};

export default ViewBuildingComponentsFinancialChart;
