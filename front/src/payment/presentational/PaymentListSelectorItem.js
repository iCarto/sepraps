import {TextLink} from "base/navigation/components";

import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import {getStatusIcon} from "./PaymentStatusChip";
import {getAppraisalIcon} from "./PaymentAppraisalChip";

const PaymentListSelectorItem = ({payment, to, selected = false}) => {
    return (
        <ListItem
            disablePadding
            sx={{
                mt: 1,
                p: 1,
                borderRadius: 1,
                backgroundColor: selected ? "secondary.lighter" : "inherit",
            }}
        >
            <Stack direction="row">
                {getStatusIcon(payment.status, !selected)}
                <TextLink
                    text={payment.name}
                    to={to}
                    textStyle={{
                        fontWeight: selected ? "bold" : "inherit",
                        pl: 1,
                    }}
                />
            </Stack>
        </ListItem>
    );
};

export default PaymentListSelectorItem;
