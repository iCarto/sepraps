import {NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {theme} from "Theme";

import {PaymentDataProgress} from ".";
import {LightHeading} from "base/ui/headings/components";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const PaymentsFinancialDataBox = ({
    headline,
    firstValue,
    secondValue,
    percentageValue,
    percentageLabel = null,
    percentageColor = "paid",
    subheading = null,
    body = null,
}) => {
    return (
        <Grid
            container
            alignItems="center"
            sx={{border: 1, borderColor: "lightgrey", borderRadius: 5, p: 2}}
        >
            <Grid item xs={9} pl="1rem">
                <LightHeading>{headline}</LightHeading>
                <Stack direction="row" alignItems="baseline">
                    <Typography component="span" fontSize={34}>
                        {NumberUtil.formatMillions(firstValue)}{" "}
                        <Typography component="span" fontSize={12}>
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
                        <Typography component="span" fontSize={12}>
                            {CURRENCY_SYMBOL}
                        </Typography>
                    </Typography>
                </Stack>
                {subheading}
            </Grid>
            <Grid item container xs={3} justifyContent="center" alignItems="center">
                <PaymentDataProgress
                    label={percentageLabel}
                    value={percentageValue || 0}
                    color={percentageColor}
                />
            </Grid>
            {body ? (
                <Grid item xs={12} sx={{mt: 2}}>
                    {body}
                </Grid>
            ) : null}
        </Grid>
    );
};

export default PaymentsFinancialDataBox;
