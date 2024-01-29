import Grid from "@mui/material/Grid";
import {
    BuildingComponentsExpectedDataSubheading,
    BuildingComponentsFinancialDataBox,
    BuildingComponentsRealDataSubheading,
} from "buildingComponent/presentational";

const BuildingComponentsFinancialData = ({financialData}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <BuildingComponentsFinancialDataBox
                    headline="Monto total vs. previsión inicial"
                    mainValues={{
                        first: financialData.real_amount,
                        second: financialData.expected_amount,
                    }}
                    subheading={
                        <BuildingComponentsExpectedDataSubheading
                            data={financialData}
                        />
                    }
                    percentage={{
                        value: financialData.real_expected_percentage,
                    }}
                    colorNamePrimary="expected"
                    colorNameSecondary="expected"
                />
            </Grid>
            <Grid item xs={12}>
                <BuildingComponentsFinancialDataBox
                    headline="Monto pagado vs. monto total"
                    mainValues={{
                        first: financialData.paid_amount,
                        second: financialData.real_amount,
                    }}
                    subheading={
                        <BuildingComponentsRealDataSubheading data={financialData} />
                    }
                    percentage={{
                        label: "Pagado",
                        value: financialData.paid_real_percentage,
                    }}
                    colorNamePrimary="paid"
                    colorNameSecondary="paid"
                />
            </Grid>
        </Grid>
    );
};

export default BuildingComponentsFinancialData;
