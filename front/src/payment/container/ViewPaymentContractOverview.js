import {useOutletContext} from "react-router-dom";
import {PaymentCalendar, PaymentsFinancialData} from "payment/presentational";
import {SectionCard} from "base/ui/section/components";
import PaperComponent from "base/shared/components/PaperComponent";
import Grid from "@mui/material/Grid";

const ViewPaymentContractOverview = () => {
    const {contract, payments} = useOutletContext();

    let startDate = new Date(contract.execution_start_date);
    let endDate = new Date(
        contract.amended_expected_execution_end_date ||
            contract.expected_execution_end_date
    );

    const paymentsWithDate =
        payments &&
        payments.map(payment => {
            const paymentDate = payment.approval_date || payment.expected_approval_date;
            return {
                ...payment,
                paymentDate: paymentDate ? new Date(paymentDate) : null,
            };
        });

    if (paymentsWithDate?.length > 0) {
        if (paymentsWithDate[0].paymentDate.getTime() < startDate.getTime()) {
            startDate = paymentsWithDate[paymentsWithDate.length - 1].paymentDate;
        }
        if (
            paymentsWithDate[paymentsWithDate.length - 1].paymentDate.getTime() >
            endDate.getTime()
        ) {
            endDate = paymentsWithDate[paymentsWithDate.length - 1].paymentDate;
        }
    }

    const contractYears = Array(endDate.getFullYear() - startDate.getFullYear() + 1)
        .fill()
        .map((_, idx) => startDate.getFullYear() + idx);

    return (
        payments && (
            <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={6}>
                    <PaperComponent>
                        <PaymentsFinancialData contract={contract} />
                    </PaperComponent>
                </Grid>
                <Grid item xs={6}>
                    <PaperComponent>
                        <SectionCard title="Calendario de productos">
                            <PaymentCalendar
                                years={contractYears}
                                payments={paymentsWithDate}
                            />
                        </SectionCard>
                    </PaperComponent>
                </Grid>
            </Grid>
        )
    );
};

export default ViewPaymentContractOverview;
