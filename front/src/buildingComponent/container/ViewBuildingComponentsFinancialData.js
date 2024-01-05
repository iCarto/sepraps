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

    const getExpectedFinancialData = financialData => (
        <BuildingComponentsFinancialDataBox
            headline="Monto total vs. previsión inicial"
            mainValues={{
                first: financialData.real_amount,
                second: financialData.expected_amount,
            }}
            subheading={
                <BuildingComponentsExpectedDataSubheading data={financialData} />
            }
            percentage={{
                value: financialData.real_expected_percentage,
            }}
            colorNamePrimary="monto-total"
            colorNameSecondary="expected"
        />
    );

    const getRealFinancialData = financialData => (
        <BuildingComponentsFinancialDataBox
            headline="Monto pagado vs. monto total"
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

    return (
        financialData && (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {getExpectedFinancialData(financialData)}
                </Grid>
                <Grid item xs={6}>
                    {getRealFinancialData(financialData)}
                </Grid>
            </Grid>
        )
    );
};

export default ViewBuildingComponentsFinancialData;
