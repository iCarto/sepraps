import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";

import {
    BuildingComponentsExpectedDataSubheading,
    BuildingComponentsFinancialDataBox,
    BuildingComponentsRealDataSubheading,
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

    const getRealFinancialData = financialData => (
        <BuildingComponentsFinancialDataBox
            headline="Pagado vs. total"
            mainValues={{
                first: financialData.paid_amount,
                second: financialData.real_amount,
            }}
            subheading={<BuildingComponentsRealDataSubheading data={financialData} />}
            percentage={{label: "Pagado", value: financialData.paid_real_percentage}}
            colorNamePrimary="paid"
            colorNameSecondary="pending"
        />
    );

    const getExpectedFinancialData = financialData => (
        <BuildingComponentsFinancialDataBox
            headline="Total vs. previsto"
            mainValues={{
                first: financialData.real_amount,
                second: financialData.expected_amount,
            }}
            subheading={
                <BuildingComponentsExpectedDataSubheading data={financialData} />
            }
            percentage={{
                label: "Gastado",
                value: financialData.real_expected_percentage,
            }}
            colorNamePrimary="monto-total"
            colorNameSecondary="expected"
        />
    );

    return (
        financialData && (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {getRealFinancialData(financialData)}
                </Grid>
                <Grid item xs={6}>
                    {getExpectedFinancialData(financialData)}
                </Grid>
            </Grid>
        )
    );
};

export default ViewBuildingComponentsFinancialData;
