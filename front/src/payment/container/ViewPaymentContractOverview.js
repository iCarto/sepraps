import {SectionCard} from "base/ui/section/components";
import {PaymentCalendar} from "payment/presentational";

const ViewPaymentContractOverview = ({payments, contract}) => {
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
            <SectionCard title="Vista anual">
                <PaymentCalendar years={contractYears} payments={paymentsWithDate} />
            </SectionCard>
        )
    );
};

export default ViewPaymentContractOverview;
