import {useOutletContext} from "react-router-dom";
import {PaymentCalendar, PaymentsFinancialData} from "payment/presentational";
import {SectionCard} from "base/ui/section/components";
import Stack from "@mui/material/Stack";
import PaperComponent from "base/shared/components/PaperComponent";

const ViewPaymentContractOverview = () => {
    const {contract, payments} = useOutletContext();

    const startDate = new Date(contract.execution_start_date);
    const endDate = new Date(
        contract.amended_expected_execution_end_date ||
            contract.expected_execution_end_date
    );
    const contractYears = Array(endDate.getFullYear() - startDate.getFullYear() + 1)
        .fill()
        .map((_, idx) => startDate.getFullYear() + idx);

    const paymentsWithDate =
        payments &&
        payments.map(payment => {
            const paymentDate = payment.approval_date || payment.expected_approval_date;
            return {
                ...payment,
                paymentDate: paymentDate ? new Date(paymentDate) : null,
            };
        });

    return (
        payments && (
            <Stack direction="row" spacing={1}>
                <PaperComponent>
                    <PaymentsFinancialData contract={contract} />
                </PaperComponent>
                <PaperComponent>
                    <SectionCard title="Calendario de productos">
                        <PaymentCalendar
                            years={contractYears}
                            payments={paymentsWithDate}
                        />
                    </SectionCard>
                </PaperComponent>
            </Stack>
        )
    );
};

export default ViewPaymentContractOverview;
