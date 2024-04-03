import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {BuildingComponentsFinancialData} from "buildingComponent/presentational";
import {Spinner} from "base/shared/components";
import {AlertError} from "base/error/components";

import Grid from "@mui/material/Grid";

const ViewBuildingComponentsFinancialData = ({filter}) => {
    const [financialData, setFinancialData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        ProjectStatsService.getBuildingComponentsTotalStats(filter)
            .then(financialData => {
                setFinancialData(financialData);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, [filter]);

    return (
        <Grid container>
            <AlertError error={error} />
            {financialData ? (
                <BuildingComponentsFinancialData financialData={financialData} />
            ) : (
                <Spinner />
            )}
        </Grid>
    );
};

export default ViewBuildingComponentsFinancialData;
