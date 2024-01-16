import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    BuildingComponentsFinancialData,
    BuildingComponentsProgress,
} from "buildingComponent/presentational";

import Grid from "@mui/material/Grid";

const ViewBuildingComponentsFinancialData = ({filter}) => {
    const [financialData, setFinancialData] = useState(null);

    useEffect(() => {
        ProjectStatsService.getBuildingComponentsTotalStats(filter).then(
            financialData => {
                setFinancialData(financialData);
            }
        );
    }, []);

    return (
        financialData && (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BuildingComponentsFinancialData financialData={financialData} />
                </Grid>
                <Grid item xs={12}>
                    <BuildingComponentsProgress financialData={financialData} />
                </Grid>
            </Grid>
        )
    );
};

export default ViewBuildingComponentsFinancialData;
