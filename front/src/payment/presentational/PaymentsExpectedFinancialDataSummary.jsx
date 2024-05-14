import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {NumberUtil} from "base/format/utilities";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const SummaryTable = ({heading, firstLine, secondLine}) => {
    return (
        <Stack
            sx={{
                p: 1,
                border: 1,
                borderColor: "grey.200",
                borderRadius: 1,
                color: "grey.500",
            }}
        >
            <Box>
                <Typography
                    component="span"
                    variant="caption"
                    sx={{fontWeight: "bold"}}
                >
                    {heading.label}:{" "}
                </Typography>
                <Typography
                    component="span"
                    variant="caption"
                    sx={{fontWeight: "bold"}}
                >
                    {NumberUtil.formatInteger(heading.value)} {CURRENCY_SYMBOL}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ml: 1}}>
                <Typography component="span" variant="caption">
                    {firstLine.label}:{" "}
                </Typography>
                <Typography component="span" variant="caption">
                    {NumberUtil.formatInteger(firstLine.value)}
                </Typography>
            </Box>
            <Box sx={{ml: 1}}>
                <Typography component="span" variant="caption">
                    {secondLine.label}:{" "}
                </Typography>
                <Typography component="span" variant="caption">
                    {NumberUtil.formatInteger(secondLine.value)}
                </Typography>
            </Box>
        </Stack>
    );
};

const PaymentsExpectedFinancialDataSummary = ({contract}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SummaryTable
                    heading={{label: "Monto total", value: contract.total_amount}}
                    firstLine={{
                        label: "Monto aprobado",
                        value: contract.total_amount_approved,
                    }}
                    secondLine={{
                        label: "Monto pendiente",
                        value: contract.total_amount_pending,
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <SummaryTable
                    heading={{
                        label: "Monto adjudicado total",
                        value: contract.total_awarding_budget,
                    }}
                    firstLine={{
                        label: "Monto adjudicado",
                        value: contract.awarding_budget,
                    }}
                    secondLine={{
                        label: "Monto adendas",
                        value: contract.total_amendments_amount,
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default PaymentsExpectedFinancialDataSummary;
