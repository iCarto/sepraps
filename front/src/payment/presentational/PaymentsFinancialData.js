import Grid from "@mui/material/Grid";
import {PaymentsFinancialDataBox, PaymentsFinancialDataSubheading} from ".";
import {NumberUtil} from "base/format/utilities";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const PaymentsFinancialData = ({contract}) => {
    const getExpectedFinancialData = contract => {
        return (
            <PaymentsFinancialDataBox
                headline="Monto total vs. Monto adjudicado"
                firstValue={contract.total_amount}
                secondValue={contract.total_awarding_budget}
                percentageValue={contract.total_amount_percentage}
                subheading={
                    <PaymentsFinancialDataSubheading
                        label="Desvío"
                        value={contract.total_awarding_budget - contract.total_amount}
                        success={contract.total_amount_percentage <= 100}
                    />
                }
                body={
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                                        Monto total:{" "}
                                    </Typography>
                                    <Typography
                                        component="span"
                                        variant="caption"
                                        sx={{fontWeight: "bold"}}
                                    >
                                        {NumberUtil.formatMillions(
                                            contract.total_amount
                                        )}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ml: 1}}>
                                    <Typography component="span" variant="caption">
                                        Monto aprobado:{" "}
                                    </Typography>
                                    <Typography component="span" variant="caption">
                                        {NumberUtil.formatMillions(
                                            contract.total_amount_approved
                                        )}
                                    </Typography>
                                </Box>
                                <Box sx={{ml: 1}}>
                                    <Typography component="span" variant="caption">
                                        Monto pendiente:{" "}
                                    </Typography>
                                    <Typography component="span" variant="caption">
                                        {NumberUtil.formatMillions(
                                            contract.total_amount_pending
                                        )}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
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
                                        Monto adjudicado total:{" "}
                                    </Typography>
                                    <Typography
                                        component="span"
                                        variant="caption"
                                        sx={{fontWeight: "bold"}}
                                    >
                                        {NumberUtil.formatMillions(
                                            contract.total_awarding_budget
                                        )}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ml: 1}}>
                                    <Typography component="span" variant="caption">
                                        Monto adjudicado:{" "}
                                    </Typography>
                                    <Typography component="span" variant="caption">
                                        {NumberUtil.formatMillions(
                                            contract.awarding_budget
                                        )}
                                    </Typography>
                                </Box>
                                <Box sx={{ml: 1}}>
                                    <Typography component="span" variant="caption">
                                        Monto adendas:{" "}
                                    </Typography>
                                    <Typography component="span" variant="caption">
                                        {NumberUtil.formatMillions(
                                            contract.total_amendments_amount
                                        )}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                }
                colorNamePrimary="monto-total"
                colorNameSecondary="expected"
            />
        );
    };

    const getRealFinancialData = contract => {
        const percentage =
            (contract.total_amount_approved / contract.total_amount) * 100;
        return (
            <PaymentsFinancialDataBox
                headline="Monto aprobado vs. Monto total"
                firstValue={contract.total_amount_approved}
                secondValue={contract.total_amount}
                percentageValue={percentage}
                subheading={
                    <PaymentsFinancialDataSubheading
                        label="Pendiente"
                        value={contract.total_amount - contract.total_amount_approved}
                        success={percentage <= 100}
                    />
                }
                colorNamePrimary="monto-total"
                colorNameSecondary="expected"
            />
        );
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {getExpectedFinancialData(contract)}
            </Grid>
            <Grid item xs={12}>
                {getRealFinancialData(contract)}
            </Grid>
        </Grid>
    );
};

export default PaymentsFinancialData;
