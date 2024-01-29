import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {DateUtil} from "base/format/utilities";
import {TextLink} from "base/navigation/components";
import {getStatusIcon} from "./PaymentStatusChip";

const PaymentCalendarItem = ({payment}) => {
    const paymentDate = payment.approval_date || payment.expected_approval_date;
    const day = DateUtil.getDayInDate(paymentDate);

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{mt: 1, p: 1, backgroundColor: "grey.100", borderRadius: 1}}
        >
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    fontSize: "0.8em",
                    textAlign: "center",
                    width: "20px",
                    height: "20px",
                }}
            >
                {day}
            </Box>
            <TextLink to={``} text={payment.name} textStyle={{fontWeight: "bold"}} />
            {getStatusIcon(payment.status)}
        </Stack>
    );
};

export default PaymentCalendarItem;
