import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PaymentCalendarMonth from "./PaymentCalendarMonth";

const PaymentCalendarYear = ({year, payments}) => {
    const findPaymentsForMonth = (payments, year, month) => {
        return payments.filter(payment => {
            if (payment.paymentDate) {
                const paymentDate = new Date(payment.paymentDate);
                return (
                    paymentDate.getMonth() === month &&
                    paymentDate.getFullYear() === year
                );
            }
            return false;
        });
    };

    return (
        <Box>
            {year}
            <Grid container>
                {[...Array(12).keys()].map(month => (
                    <Grid
                        key={`${year}-${month}`}
                        item
                        xs={3}
                        sx={{
                            p: 1,
                        }}
                    >
                        <PaymentCalendarMonth
                            month={month}
                            payments={findPaymentsForMonth(payments, year, month)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PaymentCalendarYear;
