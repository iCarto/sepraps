import PaymentCalendarYear from "./PaymentCalendarYear";

const PaymentCalendar = ({years, payments}) => {
    const findPaymentsForYear = (payments, year) => {
        return payments.filter(payment => {
            if (payment.paymentDate) {
                const paymentDate = new Date(payment.paymentDate);
                return paymentDate.getFullYear() === year;
            }
            return false;
        });
    };

    return years.map(year => (
        <PaymentCalendarYear
            key={year}
            year={year}
            payments={findPaymentsForYear(payments, year)}
        />
    ));
};

export default PaymentCalendar;
