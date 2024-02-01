import {NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";

import {theme} from "Theme";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const PaymentsFinancialDataBox = ({
    headline,
    firstValue,
    secondValue,
    percentageValue,
    percentageLabel = null,
    subheading = null,
    body = null,
    colorNameSecondary,
    colorNamePrimary,
}) => {
    return (
        <Grid
            container
            alignItems="center"
            sx={{border: 1, borderColor: "lightgrey", borderRadius: 5, p: 2}}
        >
            <Grid item xs={9} pl="1rem">
                <Typography
                    component="span"
                    variant="overline"
                    fontSize={16}
                    color={theme.palette.grey[600]}
                    lineHeight={1}
                >
                    {headline}
                </Typography>
                <Stack direction="row" alignItems="baseline">
                    <Typography component="span" fontSize={34}>
                        {NumberUtil.formatMillions(firstValue)}{" "}
                        <Typography component="span" fontSize="0.3em">
                            {CURRENCY_SYMBOL}
                        </Typography>
                    </Typography>
                    <Typography
                        component="span"
                        fontSize={24}
                        ml={1}
                        color={theme.palette.grey[600]}
                    >
                        / {NumberUtil.formatMillions(secondValue)}{" "}
                        <Typography component="span" fontSize="0.3em">
                            {CURRENCY_SYMBOL}
                        </Typography>
                    </Typography>
                </Stack>
                {subheading}
            </Grid>
            <Grid item container xs={3} justifyContent="center" alignItems="center">
                <div style={{position: "relative"}}>
                    <CircularProgress
                        variant="determinate"
                        value={100}
                        size={120}
                        thickness={5}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            color:
                                percentageValue > 100
                                    ? theme.palette.error.dark
                                    : theme.palette[colorNameSecondary].lighter,
                        }}
                    />
                    <CircularProgress
                        variant="determinate"
                        value={parseInt(percentageValue)}
                        size={120}
                        thickness={5}
                        sx={{color: theme.palette[colorNamePrimary].main}}
                    />
                    <Stack
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -60%)",
                            mt: "6px",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography component="span" fontSize="2em" lineHeight={0}>
                                {NumberUtil.formatDecimal(percentageValue, 0)}
                            </Typography>
                            <Typography component="span">%</Typography>
                        </Box>

                        <Typography component="span" variant="overline" lineHeight={1}>
                            {percentageLabel || ""}
                        </Typography>
                    </Stack>
                </div>
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
                {body}
            </Grid>
        </Grid>
    );
};

export default PaymentsFinancialDataBox;
