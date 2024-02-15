import {
    PaymentsExpectedFinancialDataSummary,
    PaymentsFinancialDataBox,
    PaymentsFinancialDataSubheading,
} from ".";
import Grid from "@mui/material/Grid";

const PaymentsFinancialData = ({contract}) => {
    const getExpectedFinancialData = contract => {
        return (
            <PaymentsFinancialDataBox
                headline="Monto total vs. Monto adjudicado"
                firstValue={contract.total_amount}
                secondValue={contract.total_awarding_budget}
                percentageValue={contract.total_amount_percentage}
                percentageColor="expected"
                subheading={
                    <PaymentsFinancialDataSubheading
                        label="Desvío"
                        value={contract.total_amount - contract.total_awarding_budget}
                        success={contract.total_amount_percentage <= 100}
                    />
                }
                body={<PaymentsExpectedFinancialDataSummary contract={contract} />}
            />
        );
    };

    const getRealFinancialData = contract => {
        const percentage =
            (contract.total_amount_approved / contract.total_amount) * 100 || 0;

        return (
            <PaymentsFinancialDataBox
                headline="Monto aprobado vs. Monto total"
                firstValue={contract.total_amount_approved}
                secondValue={contract.total_amount}
                percentageValue={percentage}
                subheading={
                    <PaymentsFinancialDataSubheading
                        label="Pendiente"
                        value={contract.total_amount - contract.total_amount_approved}
                        success={percentage <= 100}
                    />
                }
            />
        );
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {getExpectedFinancialData(contract)}
            </Grid>
            <Grid item xs={12}>
                {getRealFinancialData(contract)}
            </Grid>
        </Grid>
    );
};

export default PaymentsFinancialData;
