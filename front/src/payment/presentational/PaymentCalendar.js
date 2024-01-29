import PaymentCalendarYear from "./PaymentCalendarYear";

const PaymentCalendar = ({years, payments}) => {
    return years.map(year => (
        <PaymentCalendarYear key={year} year={year} payments={payments} />
    ));
};

export default PaymentCalendar;
