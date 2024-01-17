import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    BuildingComponentsFinancialData,
    BuildingComponentsProgress,
} from "buildingComponent/presentational";
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
    }, []);

    return (
        <Grid container spacing={2}>
            {error && <AlertError error={error} />}
            {financialData ? (
                <>
                    <Grid item xs={12}>
                        <BuildingComponentsFinancialData
                            financialData={financialData}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BuildingComponentsProgress financialData={financialData} />
                    </Grid>
                </>
            ) : (
                <Spinner />
            )}
        </Grid>
    );
};

export default ViewBuildingComponentsFinancialData;
