import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {DateUtil} from "base/format/utilities";
import PaymentCalendarItem from "./PaymentCalendarItem";

const PaymentCalendarMonth = ({month, payments}) => {
    return (
        <Box
            sx={{
                p: 1,
                border: 1,
                borderColor: "grey.200",
                borderRadius: 2,
                height: "100%",
                minHeight: "50px",
            }}
        >
            <Stack>
                <Typography variant="caption" color="grey.400">
                    {DateUtil.getMonthName(month + 1)}
                </Typography>
                <Divider />
                {payments.map(payment => {
                    return <PaymentCalendarItem key={payment.id} payment={payment} />;
                })}
            </Stack>
        </Box>
    );
};

export default PaymentCalendarMonth;
