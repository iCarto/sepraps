import {getStatusIcon} from "./PaymentStatusChip";
import {TextLink} from "base/navigation/components";

import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {DateUtil} from "base/format/utilities";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const PaymentListSelectorItem = ({payment, to, selected = false}) => {
    return (
        <ListItem
            disablePadding
            sx={{
                py: 1,
                backgroundColor: selected ? "secondary.lighter" : "white",
                borderLeft: selected ? 5 : 0,
                borderLeftColor: selected ? "primary.main" : "inherit",
            }}
        >
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    {!selected && (
                        <KeyboardArrowLeftIcon
                            sx={{color: selected ? "primary.main" : "grey.400"}}
                        />
                    )}
                </Grid>
                <Grid item xs={8}>
                    <Stack>
                        <TextLink
                            text={payment.name}
                            to={to}
                            textStyle={{
                                fontWeight: selected ? "bold" : "inherit",
                                color: selected ? "inherit" : "grey.500",
                            }}
                        />
                        <Typography sx={{fontSize: 10, color: "grey.500"}}>
                            {payment.approval_date || payment.expected_approval_date
                                ? `(${DateUtil.formatDate(
                                      payment.approval_date
                                          ? payment.approval_date
                                          : payment.expected_approval_date
                                  )})`
                                : "-"}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    {getStatusIcon(payment.status)}
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default PaymentListSelectorItem;
