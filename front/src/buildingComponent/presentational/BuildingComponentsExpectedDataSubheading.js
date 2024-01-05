import {NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";

import {theme} from "Theme";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

const BuildingComponentsExpectedDataSubheading = ({data}) => {
    const difference = data.expected_amount - data.real_amount;
    const isRealAmountWithinExpectation = difference >= 0;

    return (
        <Stack direction="row" alignItems="center">
            <Chip
                label={
                    <Typography fontSize={14}>
                        Desvío{" "}
                        <Typography component="span" fontWeight={600} fontSize={14}>
                            {NumberUtil.formatMillions(difference)} {CURRENCY_SYMBOL}
                        </Typography>
                    </Typography>
                }
                size="small"
                variant="outlined"
                sx={{
                    color: isRealAmountWithinExpectation
                        ? theme.palette.expected.dark
                        : theme.palette.error.dark,
                    borderColor: isRealAmountWithinExpectation
                        ? theme.palette.expected.dark
                        : theme.palette.error.main,
                }}
            />
        </Stack>
    );
};

export default BuildingComponentsExpectedDataSubheading;
