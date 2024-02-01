import {useState} from "react";

import PaymentCalendarMonth from "./PaymentCalendarMonth";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const PaymentCalendarYear = ({year, payments}) => {
    const [expanded, setExpanded] = useState(year === new Date().getFullYear());

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
            <Button
                startIcon={expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                onClick={() => {
                    setExpanded(!expanded);
                }}
                sx={{width: "100%", justifyContent: "flex-start"}}
            >
                <Typography>{year}</Typography>
                {payments?.length > 0 && (
                    <Typography
                        sx={{
                            ml: 1,
                            textTransform: "lowercase",
                            color: "grey.500",
                            fontSize: "0.9em",
                        }}
                    >
                        ({payments.length} productos)
                    </Typography>
                )}
            </Button>
            <Divider />
            <Collapse in={expanded} timeout="auto" sx={{width: "100%"}}>
                <Grid container>
                    {[...Array(12).keys()].map(month => (
                        <Grid
                            key={`${year}-${month}`}
                            item
                            xs={6}
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
            </Collapse>
        </Box>
    );
};

export default PaymentCalendarYear;
