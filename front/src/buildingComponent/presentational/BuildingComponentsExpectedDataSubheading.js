import {NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";

import {theme} from "Theme";
import Typography from "@mui/material/Typography";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

const BuildingComponentsExpectedDataSubheading = ({data}) => {
    const difference = data.expected_amount - data.real_amount;
    const differencePercentage = NumberUtil.formatDecimal(
        (difference / data.expected_amount) * 100,
        0
    );
    const isRealAmountWithinExpectation = difference >= 0;

    return (
        <Stack direction="row" alignItems="center">
            {isRealAmountWithinExpectation ? (
                <ArrowCircleDownIcon
                    fontSize="medium"
                    sx={{
                        color: isRealAmountWithinExpectation
                            ? theme.palette.expected.main
                            : theme.palette.error.dark,
                    }}
                />
            ) : (
                <ArrowCircleUpIcon fontSize="medium" color={"error"} />
            )}
            <Typography component="span" mx={0.5} fontWeight={600} fontSize={18}>
                {NumberUtil.formatMillions(Math.abs(difference))}
                {/* {NumberUtil.formatMillions(difference)} */}
            </Typography>
            <Typography fontSize={18}>{CURRENCY_SYMBOL} margen </Typography>
            {/* <Typography
                component="span"
                ml={0.5}
                fontSize={18}
                color={
                    isRealAmountWithinExpectation
                        ? theme.palette.expected.main
                        : theme.palette.error.dark
                }
            >
                {differencePercentage || 0}%
            </Typography> */}
            <Chip
                label={`${differencePercentage || 0}%`}
                size="small"
                variant="outlined"
                sx={{
                    marginLeft: 1,
                    color: isRealAmountWithinExpectation
                        ? theme.palette.expected.main
                        : theme.palette.error.dark,
                    borderColor: isRealAmountWithinExpectation
                        ? theme.palette.expected.main
                        : theme.palette.error.main,
                }}
            />
        </Stack>
    );
};

export default BuildingComponentsExpectedDataSubheading;
