import {NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";

import {theme} from "Theme";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

const PaymentsFinancialDataSubheading = ({label, value, success}) => {
    return (
        <Stack direction="row" alignItems="center">
            <Chip
                label={
                    <Typography fontSize={14}>
                        {label}{" "}
                        <Typography component="span" fontWeight={600} fontSize={14}>
                            {NumberUtil.formatMillions(value)} {CURRENCY_SYMBOL}
                        </Typography>
                    </Typography>
                }
                size="small"
                variant="outlined"
                sx={{
                    color: success
                        ? theme.palette.success.dark
                        : theme.palette.error.dark,
                    borderColor: success
                        ? theme.palette.success.dark
                        : theme.palette.error.main,
                }}
            />
        </Stack>
    );
};

export default PaymentsFinancialDataSubheading;
