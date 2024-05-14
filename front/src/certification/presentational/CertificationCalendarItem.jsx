import {useLocation} from "react-router-dom";

import {getStatusIcon} from "payment/presentational";
import {DateUtil, NumberUtil} from "base/format/utilities";
import {TextLink} from "base/navigation/components";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const CertificationCalendarItem = ({item: certification}) => {
    const paymentDate = certification.itemDate;
    const day = DateUtil.getDayInDate(paymentDate);

    const location = useLocation();
    const basePath = location.pathname.split("/overview")[0];

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
            <TextLink
                to={`${basePath}/list/${certification.id}`}
                text={NumberUtil.formatCurrency(certification.approved_amount)}
                textStyle={{fontWeight: "bold"}}
            />
            {getStatusIcon(certification.payment.status)}
        </Stack>
    );
};

export default CertificationCalendarItem;
