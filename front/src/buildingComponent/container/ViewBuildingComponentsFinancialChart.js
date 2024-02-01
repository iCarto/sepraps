import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";
import {BC_DATA_FILTER} from "buildingComponent/presentational/BuildingComponentsFilter";

import {
    BuildingComponentsFilter,
    BuildingComponentsFinancialChart,
} from "buildingComponent/presentational";
import {PaperComponent, Spinner} from "base/shared/components";
import {AlertError} from "base/error/components";
import Grid from "@mui/material/Grid";
import {useOutletContext} from "react-router-dom";
import Box from "@mui/material/Box";

const ViewBuildingComponentsFinancialChart = ({displayGroupedBy = false}) => {
    const [chartData, setChartData] = useState(null);
    const [groupedBy, setGroupedBy] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const {contract} = useOutletContext();

    useEffect(() => {
        setIsLoading(true);
        ProjectStatsService.getBuildingComponentsStats(groupedBy, {
            contract: contract.id,
        })
            .then(chartData => {
                setIsLoading(false);
                setChartData(chartData);
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [groupedBy, contract]);

    useEffect(() => {
        if (displayGroupedBy) setGroupedBy(BC_DATA_FILTER.GROUPED_BY.UNGROUPED.code);
    }, [displayGroupedBy]);

    const handleChangeGroupedBy = value => {
        setGroupedBy(value);
    };

    return (
        <PaperComponent>
            <Grid container justifyContent="center">
                <Box sx={{width: "100%"}}>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <AlertError error={error} />
                            <Grid container mt={1}>
                                <Grid item xs={9}>
                                    <BuildingComponentsFinancialChart
                                        chartDataRaw={chartData}
                                    />
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
                        </>
                    )}
                </Box>
            </Grid>
        </PaperComponent>
    );
};

export default ViewBuildingComponentsFinancialChart;
